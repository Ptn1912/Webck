var pulseTimeout = null;

var positions = [];

var blueShapes = [{
        d: 'M136.5 184C326.931 -30.7132 743.5 41.5 902.5 401C1057.52 751.5 1436.33 307.535 1720 198.5C2366.5 -50 1914 789.5 2971.5 687.5C3369 687.5 3863 670.5 3882.59 1073.75C3882.59 1182 3877.11 1269.2 3780 1299.5C3607 1368.5 3618.55 1065.2 3247.5 926C2974.5 823.584 2969.5 1073.75 2560 981.5C1915.5 821.849 1956.74 1438.69 1670 1075C1431.5 772.5 1361.53 649.905 1008 630.5C763.532 617.083 570.563 713.937 365 687.5C53.0571 647.379 -53.5953 398.336 136.5 184Z',
    },
    {
        d: 'M200.5 227.5C151.489 -23.0001 694.82 67.2486 902.5 401C1073 675 1111 297 1569.5 216.5C2251.68 96.7279 1841.5 1160.5 2863 481C3292 189.5 3851.41 316.25 3871 719.5C3871 827.75 3904.11 1101.7 3807 1132C3634 1201 3668.08 904.527 3308 739C2911 556.5 3141 1111 2560 981.5C1915.5 821.849 1900.5 1227 1662 735.5C1493.83 388.935 1241.03 915.405 887.5 896C643.032 882.583 788.063 463.937 582.5 437.5C270.557 397.379 223 342.5 200.5 227.5Z',
    },
    {
        d: 'M314 189.5C448.5 70 752 43 683.5 320.5C606.16 633.812 1268.87 571.922 1569.5 216.5C1879.5 -150 2688.72 799 2863 481C2988.5 252 3706 317 3458 735.5C3300.67 1001 3993.82 856.712 3808 1195C3749.5 1301.5 3615.58 1248.03 3255.5 1082.5C2858.5 900 3005 735.5 2560 981.499C2232 1162.82 2040.5 1514 1943 701.5C1897.1 319.032 1272.53 949.905 919 930.5C674.532 917.083 1039.06 674.937 833.5 648.5C521.557 608.379 166.557 320.5 314 189.5Z',
    },
];

var redShapes = [{
        d: 'M26.7199 139.55C111.5 -52.8699 397.12 -29.72 569.46 112.26C733.842 247.69 704.4 416.452 858.664 516.653C1034.8 631.066 1121.78 442.597 1349.22 540.022C1512.97 610.166 1660.53 790.388 1699.9 1001.06C1718.39 1099.96 1719.36 1239.41 1676.56 1265.93C1631.41 1293.91 1574.59 1173.18 1412.5 1043.95C1326.29 975.209 1256.25 919.364 1167.88 902.756C972.532 866.044 920.58 1064.88 777.419 1017.56C611.63 962.754 595.69 667.781 440.62 647.026C333.39 632.675 299.84 768.214 209.76 742.443C73.07 703.335 -57.9201 331.628 26.7199 139.55Z',
    },
    {
        d: 'M26.7199 139.55C232.5 -237.5 162.5 241 487.5 516.653C651.882 652.083 804.236 147.799 958.5 248C1134.64 362.413 1023.56 645.018 1251 742.443C1414.75 812.587 1577.5 248 1699.9 1001.06C1718.39 1099.96 1719.36 1239.41 1676.56 1265.93C1631.41 1293.91 1574.59 1173.18 1412.5 1043.95C1326.29 975.209 1118.37 806.108 1030 789.5C834.647 752.788 920.58 1064.88 777.419 1017.56C611.63 962.754 436.07 537.408 281 516.653C173.77 502.302 299.84 768.214 209.76 742.443C73.07 703.335 -57.9201 331.628 26.7199 139.55Z',
    },
    {
        d: 'M1684.28 1130.45C1599.5 1322.87 1366.34 1245.98 1194 1104C1029.62 968.57 1038.26 734.701 884 634.5C707.86 520.087 494.936 982.925 267.5 885.5C103.749 815.356 50.4702 479.612 11.0951 268.936C-7.3884 170.039 -8.35681 30.5901 34.4372 4.07377C79.5931 -23.906 167 55 247.5 261.5C287.847 365 356.633 555.892 445 572.5C640.353 609.212 830.839 91.675 974 139C1139.79 193.806 1083.93 853.745 1239 874.5C1346.23 888.851 1471.42 747.229 1561.5 773C1698.19 812.108 1768.92 938.372 1684.28 1130.45Z',
    },
];

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function storeUtm() {
    var utmVars = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];

    var self = window.location.toString();
    var querystring = self.split("?");
    var found = false;
    if (querystring.length > 1) {
        var pairs = querystring[1].split("&");

        var utms = {};
        for (i in pairs) {
            var keyval = pairs[i].split("=");

            if (utmVars.includes(keyval[0])) {
                found = true;
                utms[keyval[0]] = decodeURIComponent(keyval[1]);
            }
        }
    }

    if (found) {
        sessionStorage.setItem('utm', JSON.stringify(utms));
        sessionStorage.getItem('referrer') && sessionStorage.removeItem('referrer');
    } else if (document.referrer) {
        var a = document.createElement('a');
        a.href = document.referrer;

        if (a.hostname && window.location.hostname !== a.hostname) {
            sessionStorage.setItem('referrer', a.hostname);
            sessionStorage.getItem('utm') && sessionStorage.removeItem('utm');
        }
    }
};

function getUtmParameters() {
    var utmSession = sessionStorage.getItem('utm');
    if (utmSession) {
        return new URLSearchParams(JSON.parse(utmSession) || {}).toString();
    } else if (sessionStorage.getItem('referrer')) {
        return 'referrer=' + encodeURIComponent(sessionStorage.getItem('referrer'));
    }
};

function applyUtmParametersToUrl(url) {
    if (!url) {
        return url;
    }

    var utmParamters = getUtmParameters();
    if (!utmParamters) {
        return url;
    }

    return url.includes('?') ? (url + '&' + utmParamters) : (url + '?' + utmParamters)
};

window.addEventListener('load', function() {
    var hues = document.querySelectorAll('[hue]');
    for (let hue of hues) {
        var children = Array.from(hue.querySelectorAll('*'));
        if (children.length) {
            for (let child of children) {
                child.classList.add('ignore');
            }
        }

        hue.addEventListener('mouseenter', function(ev) {
            ev.target.classList.add('show-hue');
        });
        hue.addEventListener('mouseleave', function(ev) {
            ev.target.classList.remove('show-hue');
        });
        hue.addEventListener('mousemove', function(ev) {
            ev.target.setAttribute('style', `--huePosX: ${ev.offsetX - 5}px; --huePosY: ${ev.offsetY - 5}px`);
        });
    }

    var desktopNavs = Array.from(document.querySelectorAll('.header__nav-el'));
    for (var nav of desktopNavs) {
        nav.addEventListener('click', function(e) {
            target = e.target;
            if (!target.classList.contains('header__nav-el')) {
                if (target.classList.contains('header__nav-panel') || !!target.closest('.header__nav-panel')) return;
                target = target.closest('.header__nav-el');
            }

            var open = target.classList.contains('header__nav-el--open');
            if (open) return target.classList.remove('header__nav-el--open');

            if (document.body.querySelector('.header__nav-el--open'))
                document.body.querySelector('.header__nav-el--open').classList.remove('header__nav-el--open');

            if (target.classList.contains('header__nav-el--link')) return;

            if (!open) return target.classList.add('header__nav-el--open');
        });
    }
    document.body.addEventListener('click', function(e) {
        if (!e.target.closest('.header'))
            document.body.querySelector('.header__nav-el--open') ? .classList.remove('header__nav-el--open');
    });

    inViewAnimationsCheck();

    bindMobileNavigation();

    var selects = Array.from(document.querySelectorAll('.select'));
    for (var select of selects) {
        select.addEventListener('click', function(e) {
            if (!!e.target.closest('.select__panel-inner')) return;

            var container = e.target.closest('.select');

            var open = container.classList.contains('select--open');

            if (open) {
                return container.classList.remove('select--open');
            }

            if (document.body.querySelector('.select--open'))
                document.body.querySelector('.select--open').classList.remove('select--open');

            if (!open) return container.classList.add('select--open');
        });
    }

    onScrollHeaderCheck();
    checkBannerPosition();
});

function onScrollCloseOpenHeaderPanels() {
    var active = document.querySelector('.header__nav-el--open');
    if (!active) return;

    var panel = active.querySelector('.header__nav-panel');
    if (Math.abs(panel.getBoundingClientRect().top) > panel.clientHeight) active.classList.remove('header__nav-el--open');
}

function inViewAnimationsCheck() {
    var numberAnimations = Array.from(document.querySelectorAll('[aryel-number]'));
    for (var number of numberAnimations.filter(function(number) {
            return !number.classList.contains('animated');
        })) {
        if (number.getBoundingClientRect().top - window.innerHeight + 150 > 0) return;

        number.classList.add('animated');
        anime({
            targets: number,
            innerText: [0, number.getAttribute('aryel-number')],
            round: 1,
            easing: 'easeInOutExpo',
            update: function(a) {
                var target = a.animatables[0].target;
                var value = a.animations[0].currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                target.innerText =
                    target.getAttribute('aryel-number-prefix').trim() +
                    value.trim() +
                    target.getAttribute('aryel-number-suffix').trim();
            },
        });
    }
}

function bindMobileNavigation() {
    var navs = Array.from(document.querySelectorAll('[aryel-mobile-nav-target]'));
    for (var nav of navs) {
        nav.addEventListener('click', function(e) {
            target = e.target;
            if (!target.hasAttribute('aryel-mobile-nav-target')) target = target.closest('[aryel-mobile-nav-target]');

            var id = target.getAttribute('aryel-mobile-nav-target');
            var childNav = document.querySelector(`[aryel-mobile-nav="${id}"]`);

            childNav.classList.add('header__mobile-sub-nav--show');
            document.querySelector('.header__mobile').classList.add('header__mobile--child-open');
        });
    }

    var childNavClosers = Array.from(document.querySelectorAll('.header__mobile-back'));
    for (var childNavCloser of childNavClosers) {
        childNavCloser.addEventListener('click', function(e) {
            e.target.closest('[aryel-mobile-nav]').classList.remove('header__mobile-sub-nav--show');
            document.querySelector('.header__mobile').classList.remove('header__mobile--child-open');
        });
    }

    var mobileUseCaseNavs = Array.from(document.querySelectorAll('.header__mobile-use-case--open'));
    for (var mobileUseCaseNav of mobileUseCaseNavs) {
        mobileUseCaseNav.setAttribute('style', `--height: ${mobileUseCaseNav.clientHeight}px`);
        mobileUseCaseNav.classList.remove('header__mobile-use-case--open');
        mobileUseCaseNav.querySelector('.d-flex').addEventListener('click', function(e) {
            target = e.target;
            if (!target.classList.contains('header__mobile-use-case')) target = target.closest('.header__mobile-use-case');

            target.classList.toggle('header__mobile-use-case--open');
        });
    }

    var navBlob = anime({
        targets: document.querySelector('.header__mobile-blob path'),
        d: blueShapes.map(function(shape) {
            return {
                value: shape.d
            };
        }),
        duration: 30000,
        direction: 'alternate',
        autoplay: true,
        easing: 'easeInOutSine',
        elasticity: 200,
        loop: true,
    });

    navBlob.pause();

    document.querySelector('.header__mobile-hamburger').addEventListener('click', function() {
        document.body.classList.toggle('nav-open');

        if (document.body.classList.contains('nav-open')) document.querySelector('html').style.overflow = 'hidden';
        else document.querySelector('html').style.overflow = null;

        if (document.body.classList.contains('nav-open')) navBlob.play();
        else {
            if (document.querySelector('.header__mobile-sub-nav--show'))
                document.querySelector('.header__mobile-sub-nav--show').classList.remove('header__mobile-sub-nav--show');
            document.querySelector('.header__mobile').classList.remove('header__mobile--child-open');
            for (var childOpen of Array.from(document.querySelectorAll('.header__mobile-use-case--open')))
                childOpen.classList.remove('header__mobile-use-case--open');
            navBlob.pause();
        }
    });
}

function initBlob(target, shapes) {
    var blob = target.querySelector('path');
    var shapes = shuffle(shapes);
    var startingIndex = Math.floor(Math.random() * shapes.length);
    blob.setAttribute('d', shapes[startingIndex].d);
    shapes.splice(startingIndex, 1);
    anime({
        targets: blob,
        d: shapes.map(function(shape) {
            return {
                value: shape.d
            };
        }),
        duration: 50000,
        direction: 'alternate',
        autoplay: true,
        easing: 'easeInOutSine',
        elasticity: 200,
        loop: true,
    });
}

function initBlobs() {
    initBlob(document.querySelector('.blob__hero-blue'), [{
            d: 'M181.696 1002.12C211.369 1168.91 397.509 936.452 658.718 1190.33C831.746 1358.51 832.957 1541.07 972.376 1607.29C1187.04 1709.25 1437.78 1396.92 1448.61 1100.21C1454.31 944.147 1395.8 733.318 1347.92 560.814C1347.92 560.814 1324.41 476.104 1302.52 412.795C1212.84 153.406 928.423 -130.43 637.887 64.8262C368.334 245.98 146.44 803.952 181.696 1002.12Z',
        },
        {
            d: 'M61 184C193.234 -209.838 315.365 216.95 504.5 370C684.903 515.981 935.387 204.236 1104.5 311.5C1297.6 433.981 1147 633.479 1396 736C1575.27 809.816 1754 514.5 1861.03 1073.66C1881.88 1182.59 1883.88 1336.76 1837.33 1367.06C1788.22 1399.03 1769.85 1105.69 1592 966.5C1497.4 892.47 1305.6 838.118 1209 821.779C995.451 785.653 955.635 977.55 799 928.5C617.602 871.69 694.958 592.903 525.5 573.5C408.321 560.084 367.032 677.435 268.5 651C118.977 610.883 -30.1178 398.318 61 184Z',
        },
        {
            d: 'M140.5 232C824.5 -6.49998 364.365 404.23 553.5 557.28C733.903 703.261 679.5 275 939.214 557.28C1132.31 679.761 1298.51 400.979 1547.51 503.5C1726.78 577.316 1816.62 841.615 1861.03 1073.66C1881.88 1182.59 1796.5 1040.97 1713.5 1095C1664.39 1126.97 1573.5 1147.99 1547.51 1127.65C1452.91 1053.62 1376.06 993.469 1279.46 977.13C1065.91 941.004 936.135 1212.55 779.5 1163.5C598.102 1106.69 484.458 560.903 315 541.5C197.821 528.084 330.737 848.214 232.205 821.779C82.6822 781.662 -125.303 324.681 140.5 232Z',
        },
        {
            d: 'M232.205 380.5C105 10.5001 563.5 85.5 601 283C655.194 568.423 888 334 888 500.5C888 862.5 1054.5 484 1448.5 932C1535.13 1030.5 1644.97 355.84 1801.5 948C1830.84 1059 1833.5 1015 1727.5 1084C1678.39 1115.97 1725.36 1266.84 1547.51 1127.65C1452.91 1053.62 1376.06 993.469 1279.46 977.13C1065.91 941.004 1010.52 1162.05 853.885 1113C672.487 1056.19 653.089 730.4 483.631 710.997C366.452 697.581 330.737 848.214 232.205 821.779C82.682 781.662 304 589.327 232.205 380.5Z',
        },
    ]);
    initBlob(document.querySelector('.blob__hero-red'), [{
            d: 'M181.696 1002.12C211.369 1168.91 397.509 936.452 658.718 1190.33C831.746 1358.51 832.957 1541.07 972.376 1607.29C1187.04 1709.25 1437.78 1396.92 1448.61 1100.21C1454.31 944.147 1395.8 733.318 1347.92 560.814C1347.92 560.814 1324.41 476.104 1302.52 412.795C1212.84 153.406 928.423 -130.43 637.887 64.8262C368.334 245.98 146.44 803.952 181.696 1002.12Z',
        },
        {
            d: 'M91.5 1144C121.173 1310.79 397.509 936.451 658.718 1190.33C831.746 1358.51 868.581 912.78 1008 979C1222.66 1080.96 1437.78 1396.92 1448.61 1100.21C1454.31 944.146 1567.88 696.504 1520 524C1520 524 1477.5 361 1302.52 412.795C928 412.795 564.036 -127.256 273.5 68C3.94695 249.154 56.244 945.832 91.5 1144Z',
        },
        {
            d: 'M181.696 1002.12C211.369 1168.91 397.509 936.452 658.718 1190.33C831.746 1358.51 1034.08 1202.78 1173.5 1269C1318.5 1337.87 1423 1364 1448.61 1100.21C1454.31 944.148 970.5 968 1244.5 781.5C1244.5 781.5 1405 664.5 1302.52 412.795C1019.5 -212 949.254 411.244 658.718 606.5C389.165 787.654 146.44 803.952 181.696 1002.12Z',
        },
        {
            d: 'M641.5 1055C671.173 1221.79 191.291 1152.62 452.5 1406.5C625.528 1574.68 868.081 1297.28 1007.5 1363.5C1222.16 1465.46 1437.78 1396.92 1448.61 1100.21C1454.31 944.147 1153.5 823 1347.92 560.814C1347.92 560.814 1435.5 368.5 1136.5 210.5C601 -19 1063.54 283.244 773 478.5C503.447 659.654 578.076 698.5 641.5 1055Z',
        },
    ]);

    var blues = Array.from(document.querySelectorAll('.blob__blue'));
    for (let blue of blues) {
        initBlob(blue, [{
                d: 'M58.9694 159.352C249.4 -55.3612 900.363 -36.2997 1294.95 116.763C1671.31 262.757 1606.63 450.055 1959.44 557.328C2362.29 679.819 2557.78 469.421 3077.25 571.951C3451.25 645.774 3789.93 841.688 3882.59 1073.75C3926.09 1182.69 3930.26 1336.87 3833.15 1367.17C3730.68 1399.15 3599.55 1266.95 3228.5 1127.75C3031.14 1053.71 2870.81 993.555 2669.28 977.214C2223.75 941.084 2108.21 1162.15 1781.42 1113.09C1402.98 1056.28 1362.51 730.463 1008.98 711.058C764.512 697.641 690.002 848.287 484.439 821.85C172.496 781.729 -131.126 373.688 58.9694 159.352Z',
            },
            {
                d: 'M58.9696 159.352C249.4 -55.3611 718.913 171.437 1113.5 324.5C1489.86 470.494 1613.19 168.727 1966 276C2368.85 398.491 2387 694.5 3083 357.5C3424.5 192.147 3789.93 841.688 3882.59 1073.75C3926.09 1182.69 3930.26 1336.87 3833.15 1367.17C3730.68 1399.15 3599.55 1266.95 3228.5 1127.75C3031.14 1053.71 2826.03 1241.34 2624.5 1225C2178.97 1188.87 2136.29 882.06 1809.5 833C1431.06 776.19 1410.03 513.405 1056.5 494C812.032 480.583 629.564 588.437 424.001 562C112.058 521.879 -131.126 373.688 58.9696 159.352Z',
            },
            {
                d: 'M235.499 309C425.93 94.2868 575.912 6.2895 970.499 159.352C1346.86 305.346 1537.19 714.577 1890 821.85C2292.85 944.341 2551.03 719.32 3070.5 821.85C3444.5 895.673 3652.29 497 3882.59 1073.75C3926.09 1182.69 3930.26 1336.87 3833.15 1367.17C3730.68 1399.15 3599.55 1266.95 3228.5 1127.75C3031.14 1053.71 2836.53 1341.34 2635 1325C2189.47 1288.87 2164.79 960.06 1838 911C1459.56 854.19 1362.51 730.463 1008.98 711.058C764.511 697.641 713.063 671.437 507.5 645C195.557 604.879 45.4035 523.336 235.499 309Z',
            },
        ]);
    }
    var darkBlues = Array.from(document.querySelectorAll('.blob__dark-blue'));
    for (let darkBlue of darkBlues) {
        initBlob(darkBlue, [{
                d: 'M21.0168 174.799C99.7367 -25.7505 400.125 -43.9439 588.086 70.4325C767.369 179.528 745.382 349.001 912.217 425.053C1102.71 511.891 1183.94 314.894 1427.28 377.76C1602.48 423.022 1766.49 578.39 1818.78 779.055C1843.33 873.254 1851.65 1009.67 1808.22 1041.76C1762.39 1075.61 1696.54 965.526 1519.99 862.164C1426.08 807.186 1349.79 762.521 1256.36 758.899C1049.81 750.898 1005.82 953.039 853.385 927.177C676.852 897.227 644.686 610.662 481.172 612.522C368.1 613.808 340.07 751.331 244.365 738.982C99.1293 720.242 -57.5637 374.993 21.0184 174.799H21.0168Z',
            },
            {
                d: 'M75.9995 171C154.719 -29.5496 400.125 -43.9444 588.086 70.432C934 280.925 888.611 -30.0004 994.5 208.5C1153 565.5 1314.66 361.134 1558 424C1733.2 469.262 1588.21 538.317 1640.5 738.982C1665.05 833.181 1851.65 1009.67 1808.22 1041.76C1762.39 1075.61 1696.54 965.526 1519.99 862.164C1426.08 807.186 1349.79 762.521 1256.36 758.899C1049.81 750.898 874.935 764.844 722.5 738.982C545.967 709.032 602.014 450.14 438.5 452C325.428 453.286 226.704 617.849 130.999 605.5C-14.2362 586.76 -13.5824 400.694 64.9997 200.5L75.9995 171Z',
            },
            {
                d: 'M21.0163 174.799C99.7362 -25.7504 265.5 338.903 496.5 264.5C775 174.799 745.381 349.001 912.216 425.053C1102.71 511.891 1405.72 204.5 1427.28 377.76C1454 592.5 1766.49 578.39 1818.78 779.055C1843.33 873.254 1781.93 862.91 1738.5 895C1692.67 928.85 1696.54 965.526 1519.99 862.164C1426.08 807.186 1280.93 591.622 1187.5 588C980.949 579.999 1005.82 953.039 853.384 927.177C676.851 897.227 644.686 610.662 481.172 612.522C368.1 613.808 349.705 437.402 254 425.053C108.764 406.313 -57.5642 374.993 21.0179 174.799H21.0163Z',
            },
        ]);
    }
    var magentas = Array.from(document.querySelectorAll('.blob__magenta'));
    for (let magenta of magentas) {
        initBlob(magenta, [{
                d: 'M1685.15 1130.85C1600.37 1323.34 1314.77 1300.18 1142.44 1158.15C978.077 1022.68 1007.51 853.85 853.266 753.614C677.141 639.16 590.166 827.696 362.749 730.237C199.012 660.068 51.4659 479.782 12.0942 269.031C-6.38789 170.1 -7.35623 30.601 35.4343 4.07516C80.5865 -23.9145 137.4 96.8525 299.471 226.132C385.677 294.895 455.711 350.76 544.07 367.374C739.408 404.099 791.355 205.188 934.504 252.529C1100.28 307.355 1116.22 602.432 1271.28 623.195C1378.5 637.551 1412.04 501.964 1502.11 527.744C1638.8 566.866 1769.78 938.705 1685.14 1130.85H1685.15Z',
            },
            {
                d: 'M1685.15 1130.85C1600.37 1323.34 1347.83 1183.03 1175.5 1041C1011.14 905.53 901.744 1090.74 747.5 990.5C571.375 876.046 665.5 598 431 598C167 598 51.4657 479.782 12.094 269.031C-6.38807 170.1 27.2095 133.526 70 107C115.152 79.0103 137.4 96.8525 299.471 226.132C385.677 294.895 489.641 199.886 578 216.5C773.338 253.225 697.351 498.659 840.5 546C1006.28 600.826 971.94 729.737 1127 750.5C1234.22 764.856 1408.93 648.72 1499 674.5C1635.69 713.622 1769.78 938.705 1685.14 1130.85H1685.15Z',
            },
            {
                d: 'M1685.15 1130.85C1600.37 1323.34 1521.33 1132.53 1349 990.5C1184.64 855.03 956.244 983.736 802 883.5C625.875 769.046 684.417 647.959 457 550.5C293.263 480.331 51.4657 479.782 12.094 269.031C-6.38804 170.1 23.7095 43.0258 66.5 16.5C111.652 -11.4897 111.929 139.752 274 269.031C360.206 337.794 455.711 350.76 544.07 367.374C739.408 404.099 804.851 307.659 948 355C1113.78 409.826 1116.22 602.432 1271.28 623.195C1378.5 637.551 1435.43 621.72 1525.5 647.5C1662.19 686.622 1769.78 938.704 1685.14 1130.85H1685.15Z',
            },
        ]);
    }
}

function checkBannerPosition() {
    if (!document.body.classList.contains('has-banner')) return;
    var banner = document.querySelector('.hb');
    var header = document.querySelector('header');
    header.style.top = `${banner.clientHeight}px`;
    document.body.style.marginTop = `${banner.clientHeight}px`;
}

function onScrollHeaderCheck() {
    if (window.innerWidth >= 992) return;
    var banner = document.querySelector('.hb');
    if (!banner) return;

    var header = document.querySelector('header');
    if (Math.abs(banner.getBoundingClientRect().top) >= banner.clientHeight) {
        if (!header.classList.contains('header--attach')) header.classList.add('header--attach');
    } else {
        if (header.classList.contains('header--attach')) header.classList.remove('header--attach');
    }
}

var globalScrollTimeout = null;
window.addEventListener('scroll', function() {
    inViewAnimationsCheck();
    onScrollHeaderCheck();
    clearTimeout(globalScrollTimeout);
    globalScrollTimeout = setTimeout(() => {
        onScrollCloseOpenHeaderPanels();
    }, 50);
});

var globalResizeTimeout = null;
window.addEventListener('resize', function() {
    inViewAnimationsCheck();
    onScrollHeaderCheck();
    clearTimeout(globalResizeTimeout);
    globalResizeTimeout = setTimeout(() => {
        onScrollCloseOpenHeaderPanels();
        checkBannerPosition();
    }, 50);
});

document.addEventListener('DOMContentLoaded', function() {
    initBlobs();
    checkBannerPosition();
    onScrollHeaderCheck();
});

window.addEventListener('message', function(event) {
    if (!window.dataLayer) return;
    if (event.data.type !== 'hsFormCallback' || event.data.eventName !== 'onFormSubmitted') return;
    if (!event.data.id) return;

    var id = event.data.id;
    if (id === '39f47a3d-efc5-4f8e-bf82-cb6fc41b1ddc') {
        window.dataLayer.push({
            event: 'form-submit--signup',
        });

        const fields = document.querySelectorAll('#email-39f47a3d-efc5-4f8e-bf82-cb6fc41b1ddc:not(.invalid)');
        if (!fields || !fields.length) return console.warn(`Can't find email fields for redirect.`);

        let email = '';
        if (fields.length === 1) email = fields[0].value.trim();
        else {
            const field = Array.from(fields).find(function(field) {
                return !!field.value.trim();
            });
            if (!field) return console.warn(`Can't choose email fields for redirect.`);
            email = field.value.trim();
        }

        window.open(applyUtmParametersToUrl(`https://admin.aryel.io/auth/sign-up?email=${email}`), '_self');
    }
    if (id === '4bbc0021-f9fe-46f3-8313-7078d52b3645') {
        window.dataLayer.push({
            event: 'form-submit--contacts',
        });
    }
    if (id === '43932d0e-f6ea-4d1c-84a0-8e9712f25844') {
        window.dataLayer.push({
            event: 'form-submit--partners',
        });
    }
    if (id === '4c1030ad-d6bb-4a3f-9134-e2dff01d2b31') {
        window.dataLayer.push({
            event: 'form-submit--text-form',
        });
    }
    if (
        [
            '385ab131-c4a9-42ef-b9a4-2a69ab0d95c2',
            '9410c10a-e507-4adc-8c0d-ae10d66d0e07',
            '398efa7f-e1e8-41b4-9d95-31f2b8b3664e',
            '2457e88b-227b-4af6-9ac4-0fb8cfcd07aa',
            'e7ec3062-bd4c-4765-9bf0-76c24b172840',
            '567cf58f-4531-432c-a03e-48d1fb5e87df',
        ].includes(id)
    ) {
        window.dataLayer.push({
            event: 'form-submit--download',
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    storeUtm();

    if (getUtmParameters()) {
        var links = Array.from(document.querySelectorAll('a[href^="https://admin.aryel.io"]'));

        for (var link of links) {
            var currentUrl = link.getAttribute('href');
            link.setAttribute('href', applyUtmParametersToUrl(currentUrl));
        }
    }
});