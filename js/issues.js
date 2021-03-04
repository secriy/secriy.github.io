const IssuesAPI = {
  requestIssuesAPI(url, callback, timeout) {
    let retryTimes = 10;
    function request() {
      return new Promise((resolve, reject) => {
        let status = 0; // 0 等待 1 完成 2 超时
        let timer = setTimeout(() => {
          if (status === 0) {
            status = 2;
            timer = null;
<<<<<<< HEAD
            reject("请求超时");
=======
            reject('请求超时');
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
            if (retryTimes == 0) {
              timeout();
            }
          }
        }, 5000);
        fetch(url).then(function(response) {
          if (status !== 2) {
            clearTimeout(timer);
            resolve(response);
            timer = null;
            status = 1;
          }
<<<<<<< HEAD
          if(response.ok) {
=======
          if (response.ok) {
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then(function(data) {
          retryTimes = 0;
          callback(data);
        }).catch(function(error) {
          if (retryTimes > 0) {
            retryTimes -= 1;
            setTimeout(() => {
              request();
            }, 5000);
          } else {
            timeout();
          }
        });
      });
    }
    request();
  },
  parseIssueStrToJson(str) {
    let jsonStr = str.match(/```json[\s|\S]*```/);
    if (jsonStr && jsonStr.length > 0) {
      jsonStr = jsonStr[0];
    }
    if (jsonStr) {
      jsonStr = jsonStr.split('```json')[1].split('```')[0];
      if (jsonStr) {
        return JSON.parse(jsonStr);
      }
    }
    return undefined;
  },
  groupIssuesData(cfg, data) {
    var groups = new Object();
    if (data.length > 0) {
      if (cfg.group != undefined) {
<<<<<<< HEAD
        let arr = cfg.group.split(':');
        if (arr.length > 1) {
          let groupKey = arr[0];
=======
        const arr = cfg.group.split(':');
        if (arr.length > 1) {
          const groupKey = arr[0];
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
          let groupList = arr[1];
          if (groupKey && groupList) {
            groupList = groupList.split(',');
          }
          cfg.group = groupList;
          for (i = 0; i < data.length; i++) {
<<<<<<< HEAD
            let obj = this.parseIssueStrToJson(data[i].body);
=======
            const obj = this.parseIssueStrToJson(data[i].body);
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
            if (obj && (groupKey in obj)) {
              let tmp = obj[groupKey];
              tmp = tmp.replace(', ', ',').split(',');
              for (var j = 0; j < tmp.length; j++) {
                if (groupList.includes(tmp[j])) {
                  let arr = groups[tmp[j]];
                  if (arr == undefined) {
                    arr = new Array();
                  }
                  arr.push(obj);
                  groups[tmp[j]] = arr;
                }
              }
            }
          }
        }
      } else {
        cfg.group = [''];
        for (i = 0; i < data.length; i++) {
<<<<<<< HEAD
          let obj = this.parseIssueStrToJson(data[i].body);
=======
          const obj = this.parseIssueStrToJson(data[i].body);
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
          if (obj) {
            let arr = groups[''];
            if (arr == undefined) {
              arr = new Array();
            }
            arr.push(obj);
            groups[''] = arr;
          }
        }
      }
    }
    return groups;
  },
  getIssuesAPIForSites(cfg) {
<<<<<<< HEAD
    let el = $(cfg.el)[0];
    $(el).append('<div class="loading"><i class="fa fa-cog fa-2x fa-spin"></i><p>正在加载</p></div>');
    this.requestIssuesAPI(cfg.api, function(data){
      $(el).find('.loading').remove();
      let dt = IssuesAPI.groupIssuesData(cfg, data);
      let groupTitles = Object.keys(dt);
      cfg.group.forEach((groupTitle, i) => {
        let issues = dt[groupTitle];
=======
    const el = $(cfg.el)[0];
    $(el).append('<div class="loading"><i class="fa fa-cog fa-2x fa-spin"></i><p>正在加载</p></div>');
    this.requestIssuesAPI(cfg.api, function(data) {
      $(el).find('.loading').remove();
      const dt = IssuesAPI.groupIssuesData(cfg, data);
      const groupTitles = Object.keys(dt);
      cfg.group.forEach((groupTitle, i) => {
        const issues = dt[groupTitle];
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
        if (issues && issues.length > 0) {
          if (groupTitle.length > 0) {
            $(el).append('<h2>' + groupTitle + '</h2>');
          } else if (name == '' && groupTitles.length > 1) {
            $(el).append('<h2>' + '未分组' + '</h2>');
          }
          $(el).append('<div class="site-card-group ' + i + '"></div>');
          // layout items
          for (j = 0; j < issues.length; j++) {
<<<<<<< HEAD
            let issue = issues[j];
=======
            const issue = issues[j];
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
            let imgTag = '';
            if (issue.screenshot && issue.screenshot.length > 0) {
              imgTag = '<div class="img"><img src="' + issue.screenshot + '" onerror="javascript:this.src=\'https://image.thum.io/get/width/1024/crop/768/' + issue.url + '\';"/></div>';
            } else {
              imgTag = '<div class="img"></div>';
            }
            let infoTag = '<div class="info">';
            if (issue.avatar && issue.avatar.length > 0) {
              infoTag += '<img src="' + issue.avatar + '" onerror="javascript:this.src=\'https://image.thum.io/get/width/1024/crop/768/' + issue.url + '\';"/>';
            }
            infoTag += '<span class="title">' + issue.title + '</span><span class="desc">' + issue.description + '</span></div>';
<<<<<<< HEAD
            let cardTag = "<a class='site-card' target='_blank' href='" + issue.url + "'>" + imgTag + infoTag + "</a>";
=======
            const cardTag = '<a class=\'site-card\' target=\'_blank\' href=\'' + issue.url + '\'>' + imgTag + infoTag + '</a>';
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
            $(el).find('.site-card-group.' + i).append(cardTag);
          }
        }
      });
    }, function() {
      $(el).find('.loading i').remove();
      $(el).find('.loading p').text('加载失败，请稍后重试。');
    });
  },
  getIssuesAPIForTimeline(cfg) {
<<<<<<< HEAD
    let el = $(cfg.el)[0];
    $(el).append('<div class="loading"><i class="fa fa-cog fa-2x fa-spin"></i><p>正在加载</p></div>');
    this.requestIssuesAPI(cfg.api, function(data){
      $(el).find('.loading').remove();
      if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
          let a = '&nbsp;&nbsp;<a class="comments" target="_blank" href="' + data[i].html_url + '"><i class="fa fa-comment-dots fa-fw"></i>' + data[i].comments + '</a>';
          let meta = '<div class="meta"><p></p><p>' + data[i].title + a + '</p><p></p></div>';
          let body = '<div class="body"><p>' + data[i].body + '</p></div>';
          let tag = '<div class="timenode">' + meta + body + '</div>';
=======
    const el = $(cfg.el)[0];
    $(el).append('<div class="loading"><i class="fa fa-cog fa-2x fa-spin"></i><p>正在加载</p></div>');
    this.requestIssuesAPI(cfg.api, function(data) {
      $(el).find('.loading').remove();
      if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
          const a = '&nbsp;&nbsp;<a class="comments" target="_blank" href="' + data[i].html_url + '"><i class="fa fa-comment-dots fa-fw"></i>' + data[i].comments + '</a>';
          const meta = '<div class="meta"><p></p><p>' + data[i].title + a + '</p><p></p></div>';
          const body = '<div class="body"><p>' + data[i].body + '</p></div>';
          const tag = '<div class="timenode">' + meta + body + '</div>';
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
          $(el).append(tag);
        }
      }
    }, function() {
      $(el).find('.loading i').remove();
      $(el).find('.loading p').text('加载失败，请稍后重试。');
    });
  },
  request() {
<<<<<<< HEAD
    let els = document.getElementsByClassName('issues-api');
    for (var i = 0; i < els.length; i++) {
      let el = els[i];
      let api = el.getAttribute('api');
      let group = el.getAttribute('group');
=======
    const els = document.getElementsByClassName('issues-api');
    for (var i = 0; i < els.length; i++) {
      const el = els[i];
      const api = el.getAttribute('api');
      const group = el.getAttribute('group');
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
      var cfg = new Object();
      cfg.class = el.getAttribute('class');
      cfg.el = el;
      cfg.api = api;
      cfg.group = group;
      if (cfg.class.split(' ').includes('sites')) {
        this.getIssuesAPIForSites(cfg);
      } else if (cfg.class.split(' ').includes('timeline')) {
        this.getIssuesAPIForTimeline(cfg);
      }
    }
  }
};
IssuesAPI.request();
<<<<<<< HEAD
document.addEventListener('pjax:complete', function () {
=======
document.addEventListener('pjax:complete', function() {
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
  IssuesAPI.request();
});
