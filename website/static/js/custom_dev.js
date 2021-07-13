//数学公式  mathJax
let isMathjaxConfig = false; // 防止重复调用Config，造成性能损耗

const initMathjaxConfig = () => {
  if (!window.MathJax) {
    return;
  }
  window.MathJax.Hub.Config({
    showProcessingMessages: false, //关闭js加载过程信息
    messageStyle: 'none', //不显示信息
    jax: ['input/TeX', 'output/HTML-CSS'],
    tex2jax: {
      inlineMath: [
        ['$', '$'],
        ['\\(', '\\)']
      ], //行内公式选择符
      displayMath: [
        ['$$', '$$'],
        ['\\[', '\\]']
      ], //段内公式选择符
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'a'] //避开某些标签
    },
    'HTML-CSS': {
      availableFonts: ['STIX', 'TeX'], //可选字体
      showMathMenu: false //关闭右击菜单显示
    }
  });
  isMathjaxConfig = true; //
};

if (isMathjaxConfig === false) {
  // 如果：没有配置MathJax
  initMathjaxConfig();
}

// 如果，不传入第三个参数，则渲染整个document
// 因为使用的Vuejs，所以指明#app，以提高速度
// window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.querySelector('.markdown')]);

//流程图
// mermaid.initialize({startOnLoad:true});

(function (history) {
  var pushState = history.pushState;
  function render() {
    setTimeout(() => {
      // 走路由跳不会加载这个js
      document.querySelector('.markdown') &&
        window.MathJax.Hub.Queue(['Typeset', MathJax.Hub, document.querySelector('.markdown')]);
      document.querySelector('.mermaid') && mermaid.init();
    }, 0);
  }
  history.pushState = function (state) {
    if (typeof history.onpushstate == 'function') {
      history.onpushstate({ state: state });
    }
    render();
    return pushState.apply(history, arguments);
  };

  window.addEventListener('popstate', function () {
    render();
  });
})(window.history);
