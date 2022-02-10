import { WISHLIST_REPOSITORY } from "src/core/constants/repositories";
import { Wishlist } from "src/modules/wishlist/wishlist.entity";

export const WishlistProvider = [
  { provide: WISHLIST_REPOSITORY, useValue: Wishlist }
];