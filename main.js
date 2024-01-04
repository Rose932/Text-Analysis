const fs = require('fs');
const csv = require('csv-parser');

const reviewsData = {
  reviews: {
    positiveSentiment: [],
    negativeSentiment: [],
  },
};

fs.createReadStream('reviews.csv')
  .pipe(csv(['reviews', 'sentiment']))
  .on('data', (row) => {
    
    // show the data
    console.log(row)
        
    if (row && row.hasOwnProperty('reviews') && row.hasOwnProperty('sentiment')) {
      const review = (row.reviews || '').trim();
      const sentiment = (row.sentiment || '').trim().toLowerCase();

      if (sentiment === 'positive') {
        reviewsData.reviews.positiveSentiment.push(review);
      } else if (sentiment === 'negative') {
        reviewsData.reviews.negativeSentiment.push(review);
      }
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');

    // Write the populated reviewsData to a JSON file
    fs.writeFileSync('sentimentReviews.json', JSON.stringify(reviewsData, null, 2));
    console.log('Data written to sentimentReviews.json');
  });
