(function($) {
  if (!$) {
    return;
  }

  class Tooltip {
    constructor({ el, settings }) {
      this.isTooltipShown = false;
      this.cb = settings.onApprove;
      this.el = el;
      this.$trigger = $(el);
      this.$arrow = $('<div>').addClass('tooltip__arrow');
      this.$wrapper = $('<div>').addClass('tooltip__wrapper');
      this.$tooltip = $('<div>').addClass('tooltip');
      this.$button = $('<button>')
        .addClass('btn tooltip__button')
        .text('OK');

      if (settings.title) {
        this.$wrapper.append(
          $('<div>')
            .addClass('tooltip__title')
            .text(settings.title),
        );
      }

      if (settings.content) {
        this.$wrapper.append(
          $('<div>')
            .addClass('tooltip__content')
            .text(settings.content),
        );
      }

      this.$wrapper.append(this.$button, this.$arrow);
      this.$tooltip.append(this.$wrapper).appendTo('body');

      this.$button.on('click', this.hide.bind(this));
      this.$trigger.on('mouseover', this.show.bind(this));

      this.show();
    }

    show() {
      if (this.isTooltipShown) {
        return;
      }
      this.isTooltipShown = true;

      this.calculatePosition();
      this.$tooltip.show();
    }

    hide() {
      if (!this.isTooltipShown) {
        return;
      }
      this.isTooltipShown = false;
      this.$tooltip.hide();

      if (typeof this.cb === 'function') {
        this.cb();
      }
    }

    calculatePosition() {
      const triggerPos = this.$trigger.offset(); // position in doc
      const triggerRect = this.el.getBoundingClientRect(); // position in viewport
      const triggerWidth = triggerRect.width;
      const triggerHeight = triggerRect.height;

      const viewWidth = document.documentElement.clientWidth;
      const viewHeight = document.documentElement.clientHeight;
      console.log(viewHeight);
      const tooltipWidth = this.$tooltip.width();
      const tooltipHeight = this.$tooltip.height();

      const canBeOnTop = triggerRect.top - tooltipHeight - 10 > 0; // tooltip can be placed on top
      const top = canBeOnTop
        ? triggerPos.top - tooltipHeight - 10
        : triggerPos.top + triggerHeight + 10;

      const left = triggerPos.left + triggerWidth / 2 - tooltipWidth / 2;
      const right = triggerPos.left + triggerWidth / 2 + tooltipWidth / 2;
      const canBeInHorCenter = left > 0 && right < viewWidth; // tootip can be placed in the horizontal center

      if (canBeInHorCenter) {
        this.$tooltip.css({
          top,
          left,
        });

        this.$arrow.css({
          left: '50%',
          top: canBeOnTop ? '100%' : 0,
        });

        return;
      }

      const topHorCenter =
        triggerRect.top + triggerHeight / 2 - tooltipHeight / 2;
      const botHorCenter =
        triggerRect.top + triggerHeight / 2 + tooltipHeight / 2;

      const canBeInVerCenter = topHorCenter > 0 && botHorCenter < viewHeight;

      const canBeOnRight =
        triggerRect.left + triggerWidth + 10 + tooltipWidth < viewWidth;
      const canBeOnLeft = triggerRect.left - tooltipWidth - 10 > 0;

      if (canBeInVerCenter && canBeOnRight) {
        this.$tooltip.css({
          top: triggerPos.top + triggerHeight / 2 - tooltipHeight / 2,
          left: triggerPos.left + triggerWidth + 10,
        });

        this.$arrow.css({
          left: '0%',
          top: '50%',
        });
        return;
      }

      if (canBeInVerCenter && canBeOnLeft) {
        this.$tooltip.css({
          top: triggerPos.top + triggerHeight / 2 - tooltipHeight / 2,
          left: triggerPos.left - tooltipWidth - 10,
        });

        this.$arrow.css({
          left: '100%',
          top: '50%',
        });
        return;
      }

      if (left <= 0) {
        this.$tooltip.css({
          top,
          left: 10,
        });

        this.$arrow.css({
          left: triggerRect.left + triggerWidth / 2 - 10,
          top: canBeOnTop ? '100%' : 0,
        });

        return;
      }

      this.$tooltip.css({
        top,
        left: viewWidth - tooltipWidth - 10,
      });

      this.$arrow.css({
        left:
          tooltipWidth - (viewWidth - triggerRect.left - triggerWidth / 2) + 10,
        top: canBeOnTop ? '100%' : 0,
      });
    }
  }

  function createTooltip(e) {
    const { el, settings } = e.data;
    return new Tooltip({ el, settings });
  }

  $.fn.showToolTip = function(options) {
    const settings = $.extend(
      {
        title: null,
        content: null,
        onApprove: null,
      },
      options,
    );

    return this.each(function() {
      $(this).one('mouseover', { el: this, settings }, createTooltip);
    });
  };
})(jQuery);
