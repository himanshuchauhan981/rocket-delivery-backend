interface ReviewImages {
  id: number;
  url: string;
}

interface ProductReview {
  id: number;
  headline: string;
  opinion: string;
  ratings: number;
  product_id: number;
  review_images: ReviewImages[];
}

interface ProductDescriptionReview {
  id: number;
  headline: string;
  opinion: string;
  created_at: Date;
}

export { ProductReview, ProductDescriptionReview };
