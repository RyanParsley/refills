$(function() {
  var containerSelector = '[data-tab-wrapper]';
  var tabListSelector = '[data-tablist]';
  var tabListItemSelector = '[data-tablist] > li';
  var tabSelector = '[data-tablist] > li > a';
  var tabPanelSelector = '[data-tabpanel]';

  $(tabListSelector).attr('role', 'tablist');
  $(tabListItemSelector).attr('role', 'presentation');
  $(tabPanelSelector).attr('role', 'tabpanel');

  // Wire up the anchors and their target tabPanels
  $(tabSelector).each(function() {
    $(this).attr({
      'role': 'tab',
      'tabindex': '-1',
      'aria-controls': getAnchor($(this))
    });
  });

  var firstTabLinkSelector = tabListItemSelector + ':first-child a';
  select($(firstTabLinkSelector));

  // Make each tabPanel focusable
  $(tabPanelSelector + ' > *:first-child').attr({
    'tabindex' : '0'
  });

  hide($(tabPanelSelector + ':not(:first-of-type)'));

  $(tabListSelector).attr('role', 'tablist');

  $(tabSelector).on('keydown', function(event) {
    var $original = $(this);
    var leftArrow = 37;
    var rightArrow = 39;
    switch (event.keyCode) {
      case leftArrow:
        $target = $(this).parents(tabListItemSelector).prev().children(tabSelector);
        break;
      case rightArrow:
        $target = $(this).parents(tabListItemSelector).next().children(tabSelector);
        break;
      default:
        $target = false
        break;
    }

    if ($target.length) {
      unselect($original);
      select($target).focus();
      hideAllTabPanels($(this));
      show($('#' + getAnchor($(document.activeElement))));
    }
  });

  $(tabSelector).on('click', function(event) {
    event.preventDefault();

    unselect($(tabSelector));
    select($(this));
    hideAllTabPanels($(this));
    show($('#' + getAnchor($(this))));
  });

  function getAnchor($element) {
    return $element.attr('href').substring(1);
  };

  function show($element) {
    return $element.attr('aria-hidden', null);
  }

  function hide($element) {
    return $element.attr('aria-hidden', 'true');
  };

  function hideAllTabPanels($element) {
    return hide($element.closest(containerSelector).find(tabPanelSelector));
  }

  function select($element) {
    return $element.attr({
      'aria-selected': true,
      'tabindex': '0'
    });
  };

  function unselect($element) {
    return $element.attr({
      'tabindex' : '-1',
      'aria-selected' : null
    });
   };
});
