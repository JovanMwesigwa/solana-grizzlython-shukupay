
import BigNumber from "bignumber.js";
import { ParsedUrlQuery } from "querystring";
import { products } from "./products";

export default function calculatePrice(number: any): BigNumber {
  let amount = new BigNumber(number);

  return amount
}