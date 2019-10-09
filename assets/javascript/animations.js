auth.onAuthStateChanged((user) => {
    if (!user) {
        var morph1 = anime({
            targets: '.polymorph#morph1',
            points: [{
                    value: '1920,1080 0,1080 0,0 432.59,0 701,968'
                },
                {
                    value: '1920,1080 0,1080 0,0 65,0 701,968'
                }
            ],
            easing: 'easeOutQuad',
            duration: 2000,
            loop: false
        });
        var morph2 = anime({
            targets: '.polymorph#morph2',
            points: [{
                    value: '1920,1080 0,1080 0,1080 1296,900 1920,1080'
                },
                {
                    value: '1920,1080 0,1080 0,708 1296,900 1920,626'
                }
            ],
            easing: 'easeOutQuad',
            duration: 2000,
            loop: false
        });
    }
})