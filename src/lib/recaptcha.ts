import { config } from '@/config';

import { BadRequestError } from './errors';

export const validateRecaptcha = async (token?: string, threshold = 0.5) => {
    if (!token) throw new BadRequestError('Sorry something went wrong, please try again');

    const res = await fetch(
        `https://recaptchaenterprise.googleapis.com/v1/projects/${config.RECAPTCHA_PROJECT_NAME}/assessments?key=${config.RECAPTCHA_PRIVATE_KEY}`,
        {
            method: 'POST',
            body: JSON.stringify({
                event: {
                    token,
                    expectedAction: 'USER_ACTION',
                    siteKey: config.RECAPTCHA_SITE_KEY,
                },
            }),
        },
    );
    const resData = await res.json();
    const score = resData?.riskAnalysis?.score;

    if (!score || score < threshold) throw new BadRequestError('Sorry something went wrong, please try again');
};
