<<<<<<< HEAD
var SearchService = "";

(function($) {
=======
var SearchService = '';

(function($) {

>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
  /**
   * A super class of common logics for all search services
   * @param options : (object)
   */
  SearchService = function(options) {
    var self = this;

    self.config = $.extend({
<<<<<<< HEAD
      per_page: 10,
      selectors: {
        body: "body",
        form: ".u-search-form",
        input: ".u-search-input",
        container: "#u-search",
        modal: "#u-search .modal",
        modal_body: "#u-search .modal-body",
        modal_footer: "#u-search .modal-footer",
        modal_overlay: "#u-search .modal-overlay",
        modal_results: "#u-search .modal-results",
        modal_metadata: "#u-search .modal-metadata",
        modal_error: "#u-search .modal-error",
        modal_loading_bar: "#u-search .modal-loading-bar",
        modal_ajax_content: "#u-search .modal-ajax-content",
        modal_logo: '#u-search .modal-footer .logo',
        btn_close: "#u-search .btn-close",
        btn_next: "#u-search .btn-next",
        btn_prev: "#u-search .btn-prev"
      },
      brands: {
        'hexo': {logo: '', url: ''},
        'google': {logo: 'google.svg', url: 'https://cse.google.com'},
        'algolia': {logo: 'algolia.svg', url: 'https://www.algolia.com'},
        'baidu': {logo: 'baidu.svg', url: 'http://zn.baidu.com/cse/home/index'},
        'azure': {logo: 'azure.svg', url: 'https://azure.microsoft.com/en-us/services/search/'}
      },
      imagePath: "https://cdn.jsdelivr.net/gh/volantis-x/cdn-volantis@master/img/logo/"
=======
      per_page : 10,
      selectors: {
        body              : 'body',
        form              : '.u-search-form',
        input             : '.u-search-input',
        container         : '#u-search',
        modal             : '#u-search .modal',
        modal_body        : '#u-search .modal-body',
        modal_footer      : '#u-search .modal-footer',
        modal_overlay     : '#u-search .modal-overlay',
        modal_results     : '#u-search .modal-results',
        modal_metadata    : '#u-search .modal-metadata',
        modal_error       : '#u-search .modal-error',
        modal_loading_bar : '#u-search .modal-loading-bar',
        modal_ajax_content: '#u-search .modal-ajax-content',
        modal_logo        : '#u-search .modal-footer .logo',
        btn_close         : '#u-search .btn-close',
        btn_next          : '#u-search .btn-next',
        btn_prev          : '#u-search .btn-prev'
      },
      brands: {
        'hexo'   : {logo: '', url: ''},
        'google' : {logo: 'google.svg', url: 'https://cse.google.com'},
        'algolia': {logo: 'algolia.svg', url: 'https://www.algolia.com'},
        'baidu'  : {logo: 'baidu.svg', url: 'http://zn.baidu.com/cse/home/index'},
        'azure'  : {logo: 'azure.svg', url: 'https://azure.microsoft.com/en-us/services/search/'}
      },
      imagePath: 'https://cdn.jsdelivr.net/gh/volantis-x/cdn-volantis@master/img/logo/'
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
    }, options);

    self.dom = {};
    self.percentLoaded = 0;
    self.open = false;
<<<<<<< HEAD
    self.queryText = "";
    self.nav = {
      next: -1,
      prev: -1,
      total: 0,
=======
    self.queryText = '';
    self.nav = {
      next   : -1,
      prev   : -1,
      total  : 0,
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
      current: 1
    };

    self.parseSelectors = function() {
      for (var key in self.config.selectors) {
        self.dom[key] = $(self.config.selectors[key]);
      }
    };

    self.beforeQuery = function() {
      if (!self.open) {
        self.dom.container.fadeIn();
        // self.dom.body.addClass('modal-active');
        // 上面的是去除了文章的滚动条，我觉得没必要
      }
<<<<<<< HEAD
      self.dom.input.each(function(index,elem) {
=======
      self.dom.input.each(function(index, elem) {
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
        $(elem).val(self.queryText);
      });
      document.activeElement.blur();
      self.dom.modal_error.hide();
      self.dom.modal_ajax_content.removeClass('loaded');
      self.startLoading();
    };

    self.afterQuery = function() {
      self.dom.modal_body.scrollTop(0);
      self.dom.modal_ajax_content.addClass('loaded');
      self.stopLoading();
    };

    /**
     * Perform a complete serach operation including UI updates and query
     * @param startIndex {int} start index or page number
     */
    self.search = function(startIndex, callback) {
      self.beforeQuery();
      if (self.search instanceof Function) {
        self.query(self.queryText, startIndex, function() {
          self.afterQuery();
        });
<<<<<<< HEAD
      }
      else {
        console.log("query() does not exist.");
=======
      } else {
        console.log('query() does not exist.');
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
        self.onQueryError(self.queryText, '');
        self.afterQuery();
      }
    };

    /**
     * Query error handler
     * @param queryText: (string)
     * @param status: (string)
     */
    self.onQueryError = function(queryText, status) {
<<<<<<< HEAD
      var errMsg = "";
      if (status === "success") errMsg = "No result found for \"" +queryText+ "\".";
      else if (status === "timeout") errMsg = "Unfortunate timeout.";
      else errMsg = "Mysterious failure.";
      self.dom.modal_results.html("");
=======
      var errMsg = '';
      if (status === 'success') errMsg = 'No result found for "' + queryText + '".';
      else if (status === 'timeout') errMsg = 'Unfortunate timeout.';
      else errMsg = 'Mysterious failure.';
      self.dom.modal_results.html('');
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
      self.dom.modal_error.html(errMsg);
      self.dom.modal_error.show();
    };

    self.nextPage = function() {
      if (self.nav.next !== -1) {
        self.search(self.nav.next);
      }
    };

    self.prevPage = function() {
      if (self.nav.prev !== -1) {
        self.search(self.nav.prev);
      }
    };

<<<<<<< HEAD
    self.getUrlRelativePath = function (url) {
      var arrUrl = url.split("//");
      var start = arrUrl[1].indexOf("/");
      var relUrl = arrUrl[1].substring(start);
      if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
      }
      return relUrl;
    }
=======
    self.getUrlRelativePath = function(url) {
      var arrUrl = url.split('//');
      var start = arrUrl[1].indexOf('/');
      var relUrl = arrUrl[1].substring(start);
      if (relUrl.indexOf('?') != -1) {
        relUrl = relUrl.split('?')[0];
      }
      return relUrl;
    };
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21

    /**
     * Generate html for one result
     * @param url : (string) url
     * @param title : (string) title
     * @param digest : (string) digest
     */
<<<<<<< HEAD
    self.buildResult = function (url, title, digest) {
      var result = self.getUrlRelativePath(url);
      var html = "";
      html = "<li>";
      html += "<a class='result' href='" + result + "'>";
      html += "<span class='title'>" + title + "</span>";
      if (digest !== "") html += "<span class='digest'>" + digest + "</span>";
      html += "</a>";
      html += "</li>";
=======
    self.buildResult = function(url, title, digest) {
      var result = self.getUrlRelativePath(url);
      var html = '';
      html = '<li>';
      html += '<a class=\'result\' href=\'' + result + '\'>';
      html += '<span class=\'title\'>' + title + '</span>';
      if (digest !== '') html += '<span class=\'digest\'>' + digest + '</span>';
      html += '</a>';
      html += '</li>';
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
      return html;
    };

    /**
     * Close the modal, resume body scrolling
     * no param
     */
    self.close = function() {
      self.open = false;
      self.dom.container.fadeOut();
      self.dom.body.removeClass('modal-active');
    };

    /**
     * Searchform submit event handler
     * @param queryText : (string) the query text
     */
    self.onSubmit = function(event) {
      event.preventDefault();
      self.queryText = $(this).find('.u-search-input').val();
      if (self.queryText) {
        self.search(1);
      }
    };

    /**
     * Start loading bar animation
     * no param
     */
    self.startLoading = function() {
      self.dom.modal_loading_bar.show();
      self.loadingTimer = setInterval(function() {
<<<<<<< HEAD
        self.percentLoaded = Math.min(self.percentLoaded+5,95);
        self.dom.modal_loading_bar.css('width', self.percentLoaded+'%');
=======
        self.percentLoaded = Math.min(self.percentLoaded + 5, 95);
        self.dom.modal_loading_bar.css('width', self.percentLoaded + '%');
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
      }, 100);
    };

    /**
     * Stop loading bar animation
     * no param
     */
    self.stopLoading = function() {
      clearInterval(self.loadingTimer);
      self.dom.modal_loading_bar.css('width', '100%');
      self.dom.modal_loading_bar.fadeOut();
      setTimeout(function() {
        self.percentLoaded = 0;
        self.dom.modal_loading_bar.css('width', '0%');
      }, 300);
    };

    /**
     * Add service branding
     * @param service {String} service name
     */
    self.addLogo = function(service) {
<<<<<<< HEAD
      var html = "";
      if (self.config.brands[service] && self.config.brands[service].logo) {
        html += "<a href='" +self.config.brands[service].url+ "' class='" +service+ "'>";
        html +=    '<img src="' +self.config.imagePath+self.config.brands[service].logo+ '" />';
        html += "</a>";
=======
      var html = '';
      if (self.config.brands[service] && self.config.brands[service].logo) {
        html += '<a href=\'' + self.config.brands[service].url + '\' class=\'' + service + '\'>';
        html +=    '<img src="' + self.config.imagePath + self.config.brands[service].logo + '" />';
        html += '</a>';
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
        self.dom.modal_logo.html(html);
      }
    };

    self.destroy = function() {
<<<<<<< HEAD
      self.dom.form.each(function(index,elem) {
=======
      self.dom.form.each(function(index, elem) {
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
        $(elem).off('submit');
      });
      self.dom.modal_overlay.off('click');
      self.dom.btn_close.off('click');
      self.dom.btn_next.off('click');
      self.dom.btn_prev.off('click');
      self.dom.container.remove();
    };

    /**
     * Load template and register event handlers
     * no param
     */
    self.init = function() {
      $('body').append(template);
      self.parseSelectors();
      self.dom.modal_footer.show();
<<<<<<< HEAD
      self.dom.form.each(function(index,elem) {
=======
      self.dom.form.each(function(index, elem) {
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
        $(elem).on('submit', self.onSubmit);
      });
      self.dom.modal_overlay.on('click', self.close);
      self.dom.btn_close.on('click', self.close);
      self.dom.btn_next.on('click', self.nextPage);
      self.dom.btn_prev.on('click', self.prevPage);
    };

    self.init();
  };

  var template = '<div id="u-search"><div class="modal"> <header class="modal-header" class="clearfix"><form id="u-search-modal-form" class="u-search-form" name="uSearchModalForm"> <input type="text" id="u-search-modal-input" class="u-search-input" /> <button type="submit" id="u-search-modal-btn-submit" class="u-search-btn-submit"> <span class="fas fa-search"></span> </button></form> <a class="btn-close"> <span class="fas fa-times"></span> </a><div class="modal-loading"><div class="modal-loading-bar"></div></div> </header> <main class="modal-body"><ul class="modal-results modal-ajax-content"></ul> </main> <footer class="modal-footer clearfix"><div class="modal-metadata modal-ajax-content"> <strong class="range"></strong> of <strong class="total"></strong></div><div class="modal-error"></div> <div class="logo"></div> <a class="nav btn-next modal-ajax-content"> <span class="text">NEXT</span> <span class="fal fa-chevron-right"></span> </a> <a class="nav btn-prev modal-ajax-content"> <span class="fal fa-chevron-left"></span> <span class="text">PREV</span> </a> </footer></div><div class="modal-overlay"></div></div>';
})(jQuery);

var BaiduSearch;
(function($) {
  'use strict';

  /**
   * TODO
   * Search by Baidu Search API
   * @param options : (object)
   */
  BaiduSearch = function(options) {
    SearchService.apply(this, arguments);
    var self = this;
<<<<<<< HEAD
    var endpoint = "";
=======
    var endpoint = '';
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
    self.addLogo('baidu');

    /**
     * Generate result list html
     * @param data : (array) result items
     */
    self.buildResultList = function(data, queryText) {
<<<<<<< HEAD
      var results = [],
          html = "";
      $.each(data, function(index, post) {
        if (self.contentSearch(post, queryText))
          html += self.buildResult(post.linkUrl, post.title, post.abstract);
      });
      html += "<script>try{pjax.refresh(document.querySelector('#u-search'));document.addEventListener('pjax:send',function(){$('#u-search').fadeOut(500);$('body').removeClass('modal-active')});}catch(e){$('#u-search').fadeOut(500);}</script>";
=======
      var results = [];
      var html = '';
      $.each(data, function(index, post) {
        if (self.contentSearch(post, queryText)) { html += self.buildResult(post.linkUrl, post.title, post.abstract); }
      });
      html += '<script>try{pjax.refresh(document.querySelector(\'#u-search\'));document.addEventListener(\'pjax:send\',function(){$(\'#u-search\').fadeOut(500);$(\'body\').removeClass(\'modal-active\')});}catch(e){$(\'#u-search\').fadeOut(500);}</script>';
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
      return html;
    };

    /**
     * Generate metadata after a successful query
     * @param data : (object) the raw google custom search response data
     */
    self.buildMetadata = function(data) {

    };

    self.loadScript = function() {
<<<<<<< HEAD
      self.dom.input.each(function(index,elem) {
        $(elem).attr('disabled', true);
      });
      var script = "<script src='http://zhannei.baidu.com/api/customsearch/apiaccept?sid=" +self.config.apiId+ "&v=2.0&callback=customSearch.initBaidu' type='text/javascript' charset='utf-8'></script>";
=======
      self.dom.input.each(function(index, elem) {
        $(elem).attr('disabled', true);
      });
      var script = '<script src=\'http://zhannei.baidu.com/api/customsearch/apiaccept?sid=' + self.config.apiId + '&v=2.0&callback=customSearch.initBaidu\' type=\'text/javascript\' charset=\'utf-8\'></script>';
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
      self.dom.body.append(script);
    };

    self.initBaidu = function() {
      self.cse = new BCse.Search(self.config.apiId);
      //self.cse.setPageNum(self.config.per_page);
<<<<<<< HEAD
      self.dom.input.each(function(index,elem) {
=======
      self.dom.input.each(function(index, elem) {
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
        $(elem).attr('disabled', false);
      });
    };

    /**
     * Get search results
     * @param queryText {String}
     * @param page {Integer}
     * @param callback {Function}
     */
    self.query = function(queryText, page, callback) {
      self.cse.getResult(queryText, function(data) {
<<<<<<< HEAD
        console.log("Searching: " + queryText);
=======
        console.log('Searching: ' + queryText);
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
        self.cse.getError(function(data) {
          console.log(data);
        });
        if (data.length > 0) {
          self.buildResultList(data, queryText);
          self.cse.getSearchInfo(queryText, function(data) {
            console.log(data);
            self.buildMetadata(data);
          });
<<<<<<< HEAD
        }
        else {
=======
        } else {
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
          self.nav.total = 0;
          self.nav.next = -1;
          self.nav.prev = -1;
          self.dom.modal_metadata.hide();
          self.dom.btn_next.hide();
          self.dom.btn_prev.hide();
<<<<<<< HEAD
          self.onQueryError(queryText, "success");
=======
          self.onQueryError(queryText, 'success');
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
        }
        if (callback instanceof Function) {
          callback();
        }
      });
    };

    self.loadScript();

    return self;
  };

<<<<<<< HEAD
})(jQuery);
=======
})(jQuery);
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
