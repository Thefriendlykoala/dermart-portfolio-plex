import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtworkDialog from '@/components/ArtworkDialog';
import ArtworkCarousel from '@/components/ArtworkCarousel';
import ArtworkGrid from '@/components/ArtworkGrid';
import { artworkData } from '@/data/artworkData';
import { Artwork } from '@/types/artwork';

const Art = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const getCurrentArtworks = () => {
    if (currentCategory === "All") {
      return Object.values(artworkData).flat();
    }
    return artworkData[currentCategory] || [];
  };

  const renderTitle = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className={char === char.toUpperCase() ? 'text-primary' : ''}>
        {char}
      </span>
    ));
  };

  return (
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1 
          key={currentCategory}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-12 text-center"
        >
          {renderTitle('dermARTIST')}
        </motion.h1>
        
        <Tabs 
          defaultValue="All" 
          className="w-full"
          onValueChange={(value) => setCurrentCategory(value)}
        >
          <TabsList className="w-full mb-8 bg-dermart-gray/20 border border-white/5 flex justify-center gap-4">
            <TabsTrigger value="All" className="px-6 data-[state=active]:bg-primary/20">All Art</TabsTrigger>
            <TabsTrigger value="Album Covers" className="px-6 data-[state=active]:bg-primary/20">Album Covers</TabsTrigger>
            <TabsTrigger value="Logos" className="px-6 data-[state=active]:bg-primary/20">Logos</TabsTrigger>
            <TabsTrigger value="Graffiti" className="px-6 data-[state=active]:bg-primary/20">Graffiti</TabsTrigger>
          </TabsList>

          <TabsContent value={currentCategory}>
            {isTouchDevice ? (
              <ArtworkGrid 
                artworks={getCurrentArtworks()} 
                onArtworkClick={setSelectedArtwork}
              />
            ) : (
              <ArtworkCarousel 
                artworks={getCurrentArtworks()} 
                onArtworkClick={setSelectedArtwork}
              />
            )}
          </TabsContent>
        </Tabs>

        <ArtworkDialog 
          artwork={selectedArtwork} 
          onClose={() => setSelectedArtwork(null)} 
        />
      </motion.div>
    </div>
  );
};

export default Art;