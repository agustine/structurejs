var PagedDatasAjax = (function(){
  'use strict';
  function PagedDatas (name, ajaxUrl, ajaxData, pageIndexName, ajaxDataType){
    _pageCount = 0;
    _pages = {};
    _pagedDataName = name;

    _pageIndexName = pageIndexName
    _ajaxOptions = {
      url: ajaxUrl,
      data: ajaxData,
      dataType: ajaxDataType
    }
  }

  var PAGE_KEY_PREFIX   = 'page_key_',
      NO_PAGE_MESSAGE   = 'no page',
      NO_ITEM_MESSAGE   = 'no item',
      NEED_FATCH_MESSAGE= 'need fatch',
      NEED_NEXT_MESSAGE = 'need fatch next',
      NEED_PREV_MESSAGE = 'need fatch prev',
      _pagedDataName    = '',
      _pageIndexName    = '',
      _pageCount        = 0,
      _pages            = {},
      _ajaxOptions      = {},
      _key              = function(pageIndex){
        return PAGE_KEY_PREFIX + pageIndex.toString();
      },
      _setPageInfo      = function(pageDataArr, pageIndex){
        var arrLength = pageDataArr.length;
        var index = 0;
        var result = [];
        var item = null;
        for(; index < arrLength; index++){
          item = pageDataArr[index];
          item.pageIndex = pageIndex;
          item.indexInPage = index;
          result[index] =  item;
        }
        return result;
      },
      _isString=function(obj){
        return obj.toString() === obj;
      },
      _writePage       = function(pageIndex, pageData, pageCount){
        var key = _key(pageIndex);
        _pageCount = pageCount;

        pageData = Array.isArray(pageData) ? pageData : null;

        if(pageData === null){
          _pages[key] = null;
          return NO_PAGE_MESSAGE;
        }

        pageData = _setPageInfo(pageData, pageIndex);

        _pages[key] = {
          value: pageData, 
          length: pageData.length
        };

        return pageData;
      },
      _checkPage        = function(pageIndex){
        var isOutofPage = (pageIndex <= _pageCount && pageIndex > 0) || _pageCount === 0;
        return isOutofPage;
      },
      _readPage         = function(pageIndex){
        var pageData,
            key = _key(pageIndex);
        if(!_checkPage(pageIndex)){
          return NO_PAGE_MESSAGE;
        }

        pageData = _pages[key];
        if(pageData === undefined){
          return NEED_FATCH_MESSAGE;
        }
        pageData = (pageData !== undefined && Array.isArray(pageData.value)) ? pageData.value : null;

        

        return pageData;
      },
      _getItem          = function(pageIndex, indexInPage){
        var pageData,
            length;

        if(!_checkPage(pageIndex)){
          return NO_PAGE_MESSAGE;
        }
        pageData = _readPage(pageIndex);

        if(_isString(pageData)){
          return NEED_FATCH_MESSAGE;
        }


        length = pageData.length;

        if(indexInPage >= length || indexInPage < 0){
          return NO_ITEM_MESSAGE;
        }

        return pageData[indexInPage];
      },
      _getItemBefore    = function(pageIndex, indexInPage){
        var pageData,
            length;

        if(pageIndex === 0 && indexInPage === 0){
          return NO_PAGE_MESSAGE;
        }
        pageIndex = indexInPage === 0 ? pageIndex - 1 : pageIndex;

        if(!_checkPage(pageIndex)){
          return NO_PAGE_MESSAGE;
        }

        pageData = _readPage(pageIndex);

        if(_isString(pageData)){
          return indexInPage === 0 ? NEED_PREV_MESSAGE : NEED_FATCH_MESSAGE;
        }

        length = pageData.length;
        indexInPage = indexInPage === 0 ? length - 1 : indexInPage - 1;

        if(indexInPage >= length || indexInPage < 0){
          return NO_ITEM_MESSAGE;
        }

        return pageData[indexInPage];
      },
      _getItemAfter     = function(pageIndex, indexInPage){
        var pageData,
            length;
        if(!_checkPage(pageIndex)){
          return NO_PAGE_MESSAGE;
        }

        pageData = _readPage(pageIndex);

        if(_isString(pageData)){
          return NEED_FATCH_MESSAGE;
        }

        length = pageData.length;
        pageIndex = indexInPage === length - 1 ? pageIndex + 1 : pageIndex;
        indexInPage = indexInPage === length - 1 ? 0 : indexInPage + 1;

        if(!_checkPage(pageIndex)){
          return NO_PAGE_MESSAGE;
        }

        pageData = _readPage(pageIndex);

        if(_isString(pageData)){
          return NEED_NEXT_MESSAGE;
        }

        length = pageData.length;
        if(indexInPage >= length || indexInPage < 0){
          return NO_ITEM_MESSAGE;
        }

        return pageData[indexInPage];
      };

  PagedDatas.returnMassages = {
    'NO_PAGE_MESSAGE'      : NO_PAGE_MESSAGE,
    'NO_ITEM_MESSAGE'      : NO_ITEM_MESSAGE,
    'NEED_FATCH_MESSAGE'   : NEED_FATCH_MESSAGE,
    'NEED_NEXT_MESSAGE'    : NEED_NEXT_MESSAGE,
    'NEED_PREV_MESSAGE'    : NEED_PREV_MESSAGE
  };

  


  PagedDatas.prototype.writePage = function(pageIndex, pageData, pageCount){
    return _writePage(pageIndex, pageData, pageCount);
  };

  PagedDatas.prototype.readPage = function(pageIndex){
    return _readPage(pageIndex);
  };

  PagedDatas.prototype.getItem = function(pageIndex, indexInPage){
    return _getItem(pageIndex, indexInPage);
  };

  PagedDatas.prototype.getItemBefore = function(pageIndex, indexInPage){
    return _getItemBefore(pageIndex, indexInPage);
  };

  PagedDatas.prototype.getItemAfter = function(pageIndex, indexInPage){
    return _getItemAfter(pageIndex, indexInPage);
  };

  return PagedDatas;
})();