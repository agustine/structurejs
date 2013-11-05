(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('structurejs#PagedData', {
    // This will run before each test in this module.
    setup: function() {
      this.msg = PagedDatas.returnMassages;
      this.testData = [[{value:'A0'},{value:'A1'},{value:'A2'},{value:'A3'},{value:'A4'},{value:'A5'},{value:'A6'},{value:'A7'},{value:'A8'},{value:'A9'}],
      [{value:'B0'},{value:'B1'},{value:'B2'},{value:'B3'},{value:'B4'},{value:'B5'},{value:'B6'},{value:'B7'},{value:'B8'},{value:'B9'}],
      [{value:'C0'},{value:'C1'},{value:'C2'},{value:'C3'},{value:'C4'},{value:'C5'},{value:'C6'},{value:'C7'},{value:'C8'},{value:'C9'}],
      [{value:'D0'},{value:'D1'},{value:'D2'},{value:'D3'},{value:'D4'},{value:'D5'},{value:'D6'},{value:'D7'},{value:'D8'},{value:'D9'}],
      [{value:'E0'},{value:'E1'},{value:'E2'},{value:'E3'},{value:'E4'},{value:'E5'},{value:'E6'},{value:'E7'},{value:'E8'},{value:'E9'}],
      [{value:'F0'},{value:'F1'},{value:'F2'},{value:'F3'},{value:'F4'},{value:'F5'},{value:'F6'},{value:'F7'},{value:'F8'},{value:'F9'}],
      [{value:'G0'},{value:'G1'},{value:'G2'},{value:'G3'},{value:'G4'},{value:'G5'},{value:'G6'},{value:'G7'},{value:'G8'},{value:'G9'}],
      [{value:'H0'},{value:'H1'},{value:'H2'},{value:'H3'},{value:'H4'},{value:'H5'},{value:'H6'},{value:'H7'},{value:'H8'},{value:'H9'}],
      [{value:'I0'},{value:'I1'},{value:'I2'},{value:'I3'},{value:'I4'},{value:'I5'},{value:'I6'},{value:'I7'},{value:'I8'}]];
    }
  });

  test('PagedData.writePage() 可以按pageIndex 写入分页信息, 并且PagedData.readPage() 可以按pageIndex 取出正确的分页信息', function() {
    var pd = new PagedDatas();
    var pageData = this.testData[1];
    var readData = null;

    pd.writePage(2, pageData, 9);
    readData = pd.readPage(2);

    checkPageData(readData, pageData);
  });

  test('PagedData.writePage()会为每一个元素添加pageIndex（所属页码）indexInPage（在当页中的位置）', function() {
    var pd = new PagedDatas();
    var item1 = null, item2 = null;
    expect((this.testData[1].length * 2) + (this.testData[2].length * 2));
    pd.writePage(2, this.testData[1], 9);
    pd.writePage(3, this.testData[2], 9);

    checkPageInfo(pd, 2);
    checkPageInfo(pd, 3);
  });

  test('PagedData.readPage() 查询的页不存在，返回正确的消息', function() {
    var pd = new PagedDatas();
    expect(2);
    pd.writePage(2, this.testData[1], 9);
    equal(pd.readPage(10), this.msg.NO_PAGE_MESSAGE);
    equal(pd.readPage(3), this.msg.NEED_FATCH_MESSAGE);
  });

  test('PagedData.getItem() 可以按指定页，指定位置的Item', function() {
    var pd = new PagedDatas();
    var item1 = null, item2 = null;
    expect(2);
    pd.writePage(2, this.testData[1], 9);
    pd.writePage(3, this.testData[2], 9);
    item1 = pd.getItem(2, 3);
    item2 = pd.getItem(3, 7);

    equal(item1.value, 'B3');
    equal(item2.value, 'C7');
  });

  test('PagedData.getItemBefore() 可以按指定页，指定位置的前一个Item', function() {
    var pd = new PagedDatas();
    var item1 = null, item2 = null;
    expect(2);
    pd.writePage(2, this.testData[1], 9);
    pd.writePage(3, this.testData[2], 9);
    item1 = pd.getItemBefore(2, 3);
    item2 = pd.getItemBefore(3, 7);

    equal(item1.value, 'B2');
    equal(item2.value, 'C6');
  });

  test('PagedData.getItemAfter() 可以按指定页，指定位置的后一个Item', function() {
    var pd = new PagedDatas();
    var item1 = null, item2 = null;
    expect(2);
    pd.writePage(2, this.testData[1], 9);
    pd.writePage(3, this.testData[2], 9);
    item1 = pd.getItemAfter(2, 3);
    item2 = pd.getItemAfter(3, 7);

    equal(item1.value, 'B4');
    equal(item2.value, 'C8');
  });


  test('PagedData.getItem() 查询的项不存在，返回正确的消息', function() {
    var pd = new PagedDatas();
    var item1 = null, item2 = null, item3 = null;
    expect(3);
    pd.writePage(2, this.testData[1], 9);
    pd.writePage(3, this.testData[2], 9);
    item1 = pd.getItem(1, 3);
    item2 = pd.getItem(10, 7);
    item3 = pd.getItem(2, 10);

    equal(item1, this.msg.NEED_FATCH_MESSAGE);
    equal(item2, this.msg.NO_PAGE_MESSAGE);
    equal(item3, this.msg.NO_ITEM_MESSAGE);
  });

  test('PagedData.getItemBefore() 查询的项不存在，返回正确的消息', function() {
    var pd = new PagedDatas();
    var item1 = null, item2 = null, item3 = null, item4 = null;
    expect(3);
    pd.writePage(2, this.testData[1], 9);
    pd.writePage(3, this.testData[2], 9);
    item1 = pd.getItemBefore(1, 3);
    item2 = pd.getItemBefore(10, 7);
    item4 = pd.getItemBefore(2, 0);

    equal(item1, this.msg.NEED_FATCH_MESSAGE);
    equal(item2, this.msg.NO_PAGE_MESSAGE);
    equal(item4, this.msg.NEED_PREV_MESSAGE);
  });

  test('PagedData.getItemAfter() 查询的项不存在，返回正确的消息', function() {
    var pd = new PagedDatas();
    var item1 = null, item2 = null, item3 = null, item4 = null;
    expect(3);
    pd.writePage(2, this.testData[1], 9);
    pd.writePage(3, this.testData[2], 9);
    item1 = pd.getItemAfter(1, 3);
    item2 = pd.getItemAfter(10, 7);
    item4 = pd.getItemAfter(3, 9);

    equal(item1, this.msg.NEED_FATCH_MESSAGE);
    equal(item2, this.msg.NO_PAGE_MESSAGE);
    equal(item4, this.msg.NEED_NEXT_MESSAGE);
  });





  function checkPageData(readData, pageData){
    var length = readData.length;
    expect(readData.length + 1);
    equal(length, pageData.length);
    for(var index = 0; index < length; index ++){
      equal(readData[index].value, pageData[index].value);
    }
  }

  function checkPageInfo(pagedData, pageIndex){
    var pageData = pagedData.readPage(pageIndex);
    var length = pageData.length;
    for(var index = 0; index < length; index ++){
      equal(pageData[index].pageIndex, pageIndex);
      equal(pageData[index].indexInPage, index);
    }
  }

  

}(jQuery));