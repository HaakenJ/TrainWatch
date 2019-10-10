var viewHeight = window.innerHeight,
    viewWidth = window.innerWidth,
    svgOneStart = `${viewWidth},${viewHeight} 0,${viewHeight} 0,0 ${viewWidth * 0.2253},0 ${viewWidth},0`,
    svgTwoStart = `${viewWidth},${viewHeight} 0,${viewHeight} 0,${viewHeight} ${viewWidth * 0.6531},${viewHeight} ${viewWidth},${viewHeight}`,
    svgVB = `0 0 ${viewWidth} ${viewHeight}`;

$(document).ready(() => {
    $('#svg-one').attr('viewBox', svgVB);
    $('#svg-two').attr('viewBox', svgVB);
    $('#morph1').attr('points', svgOneStart);
    $('#morph1').attr('points', svgTwoStart);
})



auth.onAuthStateChanged((user) => {
    if (!user) {
        var morph1 = anime({
            targets: '.polymorph#morph1',
            points: [{
                    value: `${viewWidth},${viewHeight} 0,${viewHeight} 0,0 ${viewWidth * 0.2253},0 ${viewWidth * 0.3651},${viewWidth * 0.5042}`
                },
                {
                    value: `${viewWidth},${viewHeight} 0,${viewHeight} 0,0 ${viewWidth * 0.0339},0 ${viewWidth * 0.3651},${viewWidth * 0.5042}`
                }
            ],
            easing: 'easeOutQuad',
            duration: 2000,
            loop: false
        });
        var morph2 = anime({
            targets: '.polymorph#morph2',
            points: [{
                    value: `${viewWidth},${viewHeight} 0,${viewHeight} 0,${viewHeight} ${viewWidth * 0.675},${viewWidth * 0.4688} ${viewWidth},${viewHeight}`
                },
                {
                    value: `${viewWidth},${viewHeight} 0,${viewHeight} 0,${viewWidth * 0.3688} ${viewWidth * 0.675},${viewWidth * 0.4688} ${viewWidth},${viewWidth * 0.3260}`
                }
            ],
            easing: 'easeOutQuad',
            duration: 2000,
            loop: false
        });
    }
})