console.log('Main script started!');

$('.tooltip-on-image').showToolTip({
  title: 'Sunflower',
  content: 'This is a picture of sunflower',
  onApprove() {
    console.log('ッ');
  },
});

$('.tooltip-on-svg').showToolTip({
  title: '❤️️',
  content:
    'This is a red heart! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, saepe at. Debitis vero assumenda animi',
  onApprove() {
    console.log('❤️️❤️️❤️️');
  },
});

$('.tooltip-on-text').showToolTip({
  title: 'Some text',
  content: 'This is a content of the tooltip on text',
});

$('.tooltip-on-btn').showToolTip({
  title: 'Button',
  content:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, saepe at. Debitis vero assumenda animi, iure, itaque accusantium aspernatur rerum eum exercitationem aliquam maiores! Beatae eum aspernatur ea quod commodi!',
  onApprove() {
    console.log('button');
  },
});
