/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import {useEffect, useState} from 'react'
import {useVariant} from './use-variant'
import {useIntl} from 'react-intl'
import {useVariationParams} from './use-variation-params'
import {useVariationAttributes} from './use-variation-attributes'
import useBasket from '../commerce-api/hooks/useBasket'

const OUT_OF_STOCK = 'OUT_OF_STOCK'
const UNFULFILLABLE = 'UNFULFILLABLE'
const IN_STOCK = "IN_STOCK"

// TODO: This needs to be refactored.
export const useProduct = (product, isProductPartOfSet = false) => {
    const basket = useBasket()
    const showLoading = !product
    const stockLevel = product?.inventory?.stockLevel || 0
    const stepQuantity = product?.stepQuantity || 1
    const minOrderQuantity = stockLevel > 0 ? product?.minOrderQuantity || 1 : 0
    const initialQuantity = product?.quantity || product?.minOrderQuantity || 1

    const intl = useIntl()
    const variant = useVariant(product, isProductPartOfSet)
    const variationParams = useVariationParams(product, isProductPartOfSet)
    const variationAttributes = useVariationAttributes(product, isProductPartOfSet)
    const [quantity, setQuantity] = useState(initialQuantity)

    // A product is considered out of stock if the stock level is 0 or if we have all our
    // variation attributes selected, but don't have a variant. We do this because the API
    // will sometimes return all the variants even if they are out of stock, but for other
    // products it won't.
    let quantityInBasket = 0
    if (basket.hasOwnProperty('productItems') && product && !product.hasOwnProperty('_type')) {
        const currentbasketItems = basket.productItems
        const productInBasket = currentbasketItems.find(item => item.productId === product.id)
        quantityInBasket = productInBasket ? productInBasket.quantity : 0
    }
    const isOutOfStock =
        !stockLevel ||
        (!variant && Object.keys(variationParams).length === variationAttributes.length)
    const unfulfillable = stockLevel < (quantity + quantityInBasket)
    const inStock = stockLevel && stockLevel > (quantity + quantityInBasket)
    const inventoryMessages = {
        [OUT_OF_STOCK]: intl.formatMessage({
            defaultMessage: 'Out of stock',
            id: 'use_product.message.out_of_stock'
        }),
        [IN_STOCK]: intl.formatMessage({
            defaultMessage: 'In stock',
            id: 'use_product.message.in_stock'
        }),
        [UNFULFILLABLE]: intl.formatMessage(
            {
                defaultMessage: 'Only {stockLevel} left!',
                id: 'use_product.message.inventory_remaining'
            },
            {stockLevel}
        )
    }
    const showInventoryMessage = variant && (isOutOfStock || unfulfillable)
    const showInStockMessage = variant && inStock
    const inventoryMessage =
        (isOutOfStock && inventoryMessages[OUT_OF_STOCK]) ||
        (unfulfillable && inventoryMessages[UNFULFILLABLE]) ||
        (inStock && inventoryMessages[IN_STOCK])

    // If the `initialQuantity` changes, update the state. This typically happens
    // when either the master product changes, or the inventory of the product changes
    // from out-of-stock to in-stock or vice versa.
    useEffect(() => {
        setQuantity(initialQuantity)
    }, [initialQuantity])

    return {
        showLoading,
        showInventoryMessage,
        inventoryMessage,
        variationAttributes,
        quantity,
        minOrderQuantity,
        stepQuantity,
        variationParams,
        setQuantity,
        variant,
        stockLevel,
        showInStockMessage
    }
}
