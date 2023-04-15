export const imgGenerator = () => {
  const pics = [
    'https://www.dailypioneer.com/uploads/2022/story/images/big/-spider-man--no-way-home--extended-cut-to-play-in-theatres-from-september-2-2022-06-11.jpg',

    'https://media.geeksforgeeks.org/img-practice/MaskGroup58@2x-min-1637846347.png',
    'https://media.geeksforgeeks.org/img-practice/banner/dsa-self-paced-course-overview-image.png',

    'https://media.geeksforgeeks.org/img-practice/banner/complete-interview-preparation-thumbnail.png',

    'https://media.geeksforgeeks.org/img-practice/banner/Amazon-Test-Series-thumbnail.png',

    'https://www.fastxmovie.com/images/main/mobile-optimized-v2.png?id=7_2',

    'https://media.geeksforgeeks.org/img-practice/banner/dsa-self-paced-thumbnail.png',
  ];
  let found = Math.floor(Math.random() * pics.length);
  let img = pics[found];
  return img;
};
