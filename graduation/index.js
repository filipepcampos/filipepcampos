const courseStartTime = new Date(`2022-09-12T00:00:00+00:00`).getTime()
const courseEndTime = new Date(`2024-07-10T23:59:59+00:00`).getTime()
const courseDelta = courseEndTime - courseStartTime

const courseTotalDays = Math.ceil(courseDelta / (1000 * 3600 * 24));
const courseProgress = (Date.now() - courseStartTime) / (courseDelta)

function generateSvg() {
    const circumference = 251.327412287;
  
    // Get courseProgress in days
    const courseProgressDays = Math.ceil((Date.now() - courseStartTime) / (1000 * 3600 * 24));

    const offset =  circumference - courseProgress * circumference;
  
    const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
                style='isolation: isolate' viewBox='0 0 165 195' width='165px' height='195px' direction='ltr'>
        <defs>
            <clipPath id='outer_rectangle'>
                <rect width='165' height='195' rx='5px'/>
            </clipPath>
            <mask id='mask_out_ring'>
                <rect width='165' height='195' fill='white'/>
                <ellipse id='mask-ellipse' cx='247.5' cy='32' rx='13' ry='18' fill='black'/>
            </mask>
        </defs>
        <style>
            @keyframes currstreak {
                0% { font-size: 3px; opacity: 0.2; }
                80% { font-size: 34px; opacity: 1; }
                100% { font-size: 28px; opacity: 1; }
            }
            @keyframes fadein {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            @keyframes slider {
                0% {stroke-dashoffset: ${circumference}; }
                100% {stroke-dashoffset: ${offset}; }
            }
        </style>
        <g clip-path='url(#outer_rectangle)'>
            <g style='isolation: isolate'>
                <rect stroke='#E4E2E2' fill='#0D1117' rx='5px' x='0.5' y='0.5' width='165' height='194'/>
            </g>
            <g style='isolation: isolate'>
                <!-- Number of days Big Number -->
                <g transform='translate(0,48)'>
                    <text x='81.5' y='32' stroke-width='0' text-anchor='middle' fill='#FEFEFE' stroke='none' font-family='\"Segoe UI\", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal' style='animation: currstreak 0.6s linear forwards'>
                        ${courseTotalDays - courseProgressDays}
                    </text>
                </g>
                <!-- Label -->
                <g transform='translate(0,108)'>
                    <text x='81.5' y='32' stroke-width='0' text-anchor='middle' fill='#FEFEFE' stroke='none' font-family='\"Segoe UI\", Ubuntu, sans-serif' font-weight='700' font-size='14px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>
                        Days until graduation
                    </text>
                </g>
                <!-- Subtitle -->
                <g transform='translate(0,145)'>
                    <text x='81.5' y='21' stroke-width='0' text-anchor='middle' fill='#9E9E9E' stroke='none' font-family='\"Segoe UI\", Ubuntu, sans-serif' font-weight='400' font-size='12px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>
                        ${courseProgressDays} / ${courseTotalDays} days
                    </text>
                </g>
                <!-- Ring around number -->
                <g mask='url(#mask_out_ring)'>
                    <circle 
                      cx='81.5' cy='71' r='40' 
                      fill='none' stroke='#1F6FEB' 
                      stroke-width='5' 
                      style='transform-origin: 81.5px 71px; transform:rotate(-90deg); opacity: 0; animation: fadein 0.5s linear forwards 0.4s, slider 0.5s linear forwards 0.4s; stroke-dasharray: ${circumference} ${circumference};'>
                    </circle>
                </g>
            </g>
        </g>
    </svg>
    `
    return svg
}

console.log(generateSvg())
