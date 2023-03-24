/**
 * px转upx(rpx)
 *
 * @param {number | string | null} px   px数值
 * @param {number} digits               小数位数
 *
 * @returns {number}
 */
export const px2upx = (px = null, digits = 2) => {
  return Number((Number(px) / (uni.upx2px(750) / 750)).toFixed(digits));
};