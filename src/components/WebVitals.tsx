// app/components/WebVitals.tsx
'use client'

import { useEffect } from 'react'

export function WebVitals() {
    useEffect(() => {
        // Cast window to 'any' to access custom properties like gtag and webVitals
        const customWindow = window as any;

        // Only track web vitals if GA4 is loaded
        if (typeof customWindow.gtag !== 'undefined') {

            const reportWebVitals = (metric: any) => {
                customWindow.gtag('event', metric.name, {
                    value: Math.round(metric.value),
                    event_label: metric.id,
                    non_interaction: true,
                });
            };

            if ('webVitals' in customWindow) {
                // @ts-ignore
                customWindow.webVitals(reportWebVitals);
            }
        }
    }, []);

    return null;
}