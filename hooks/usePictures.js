import { useMemo } from "react";

export const usePictures = (pictures, query) => {
  const filteredPictures = useMemo(() => {
    if (!query) return pictures;
    
    // Split search terms and normalize
    const searchTerms = query.toLowerCase().split(',').map(term => term.trim());
    
    return pictures.filter(picture => {
      // Split picture name into parts
      const [picName, picColor, picMaterial] = picture.name.toLowerCase().split('_');
      
      // Check if all search terms match the corresponding parts
      return (
        (searchTerms[0] ? picName.includes(searchTerms[0]) : true) ||
        (searchTerms[1] ? picColor.includes(searchTerms[1]) : true) ||
        (searchTerms[2] ? picMaterial.includes(searchTerms[2]) : true)
      );
    });
  }, [query, pictures]);

  return filteredPictures;
};
