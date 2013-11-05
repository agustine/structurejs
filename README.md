#structurejs

在web前端工作中为一些实际需求定义的数据结构的javascript类

##PagedData

###介绍

  	一个分页的数据模型，在之前的一些项目工作中常会做到ajax调取服务端提供的分页的数据接口。
  	在页面调用中因为特定的需求，同一页面需要反复请求同一页的数据，因为数据的实时要求不高希望反复请求数据，在浏览器缓存支持下，每次ajax取数据，没有太大问题，同一页数据会直接从浏览器缓存中取得。
	但是在需要jsonp跨域，或者返回script的情况下，无法使用浏览器缓存。另外在一些特定的项目中，需要取的，第n页的第n个item，如果已经取过该分页数据，则不希望重复请求。
	每次遇到这样的状况，都要写很多脚本，去实现，而且感觉代码非常的乱，于是就写了这样一个javascript类来存储分页数据。

###限制

	写入的分页数据必须为数组（Array），而数组中的每一项必须满足typeof item === 'object'，且没有pageIndex，indexInPage这2个属性，因为writePage方法会自动为每一个项加上这2个属性，以便调用getItemBefore和getItemAfter方法时，可以确定位置

###用法

```javascript
// 初始化
var pd = new PagedDatas();

// 返回信息的枚举 PagedDatas.returnMassages
// PagedDatas.returnMassages['NO_PAGE_MESSAGE']      : 没有该分页数据（页码 < 1 或者 页码 > 总页数）
// PagedDatas.returnMassages['NO_ITEM_MESSAGE']      : 没有在该分页中找到指定位置的项（在页中的位置 >= 该页的项的总数）
// PagedDatas.returnMassages['NEED_FATCH_MESSAGE']   : 需要写入该页的数据（页码在范围内，但是没有该页数据，需要写入）
// PagedDatas.returnMassages['NEED_NEXT_MESSAGE']    : 需要写入下一页的数据（下一页页码在范围内，但是没有该页数据，需要写入）
// PagedDatas.returnMassages['NEED_PREV_MESSAGE']    : 需要写入上一页的数据（上一页页码在范围内，但是没有该页数据，需要写入）

/**
 * 分页信息写入，每次调用改方法会重置pageCount 总页数
 * @param  {int} 		pageIndex 需要写入的页码
 * @param  {Array} 	pageData  分页信息，确保数组中每一项都不能是基本类型（满足typeof item === 'object'），且没有pageIndex，indexInPage这2个属性
 * @param  {int} 		pageCount 总页数
 * @return {Array}           	写入后的分页数据数组
 */
pd.writePage(pageIndex, pageData, pageCount);


/**
 * 分页信息读取
 * @param  {int} 							pageIndex 需要读取的页码
 * @return {Array or String}           	如果返回Array，即该分页的数据，
																				如果返回String，则对比PagedDatas.returnMassages 枚举中对应项，NO_PAGE_MESSAGE or NEED_FATCH_MESSAGE
 */
pd.readPage(pageIndex);

/**
 * 分页中读取指定页码的指定位置对应的单项
 * @param  {int} 							pageIndex   页码
 * @param  {int} 							indexInPage 在该页中的位置
 * @return {Object or String}             如果返回Object，该位置的单项，
																					如果返回String，则对比PagedDatas.returnMassages 枚举中对应项，NO_PAGE_MESSAGE or NEED_FATCH_MESSAGE or NO_ITEM_MESSAGE
 */
pd.getItem(pageIndex, indexInPage);

/**
 * 分页中读取在指定页码的指定位置前一个对应的单项
 * @param  {int} 							pageIndex   页码
 * @param  {int} 							indexInPage 在该页中的位置
 * @return {Object or String}             如果返回Object，该位置的单项，
																					如果返回String，则对比PagedDatas.returnMassages 枚举中对应项，NO_PAGE_MESSAGE or NEED_FATCH_MESSAGE or NO_ITEM_MESSAGE or NEED_PREV_MESSAGE
 */
pd.getItemBefore(pageIndex, indexInPage);

/**
 * 分页中读取在指定页码的指定位置前一个对应的单项
 * @param  {int} 							pageIndex   页码
 * @param  {int} 							indexInPage 在该页中的位置
 * @return {Object or String}             如果返回Object，该位置的单项，
																					如果返回String，则对比PagedDatas.returnMassages 枚举中对应项，NO_PAGE_MESSAGE or NEED_FATCH_MESSAGE or NO_ITEM_MESSAGE or NEED_NEXT_MESSAGE
 */
pd.getItemAfter(pageIndex, indexInPage);

```
