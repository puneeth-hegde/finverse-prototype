interface CreditInputs {
  utility: number;
  mobile: number;
  rent: number;
  ecommerce: number;
}

const WEIGHTS = {
  utility: 0.30,
  mobile: 0.15,
  rent: 0.35,
  ecommerce: 0.20,
};

const BASE_SCORE = 300;
const MAX_SCORE = 850;
const SCORE_RANGE = MAX_SCORE - BASE_SCORE;

export function calculateCreditScore(inputs: CreditInputs): {
  score: number;
  factors: Record<string, number>;
} {
  const weightedAverage =
    inputs.utility * WEIGHTS.utility +
    inputs.mobile * WEIGHTS.mobile +
    inputs.rent * WEIGHTS.rent +
    inputs.ecommerce * WEIGHTS.ecommerce;

  const calculatedScore = Math.round(BASE_SCORE + (weightedAverage / 100) * SCORE_RANGE);

  return {
    score: calculatedScore,
    factors: {
      utility: inputs.utility,
      mobile: inputs.mobile,
      rent: inputs.rent,
      ecommerce: inputs.ecommerce,
    },
  };
}