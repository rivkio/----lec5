import { calculateTotalProductsPurchased } from './services/orderAnalysis';

calculateTotalProductsPurchased()
    .then(() => {
        console.log('Analysis completed successfully');
    })
    .catch((e) => {
        console.error('Error during analysis:', e);
    })
    .finally(() => {
        process.exit(0);
    });