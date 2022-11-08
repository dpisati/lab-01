import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/services/products.service';
import { PurchaseService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchaseService,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }
}
