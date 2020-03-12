<template>
  <div>

    <van-nav-bar
      :border="false"
      class="title"
      left-arrow
      @click-left="$router.push('/main/home')" title="学分查询"
    />

    <div v-if="loadedSuccessfully">
      <div class="credit-card">
        <div class="credit-profile-item-top credit-profile-item-common">
          <div class="credit-profile-item-title">
          <span class="credit-icon">
            <svg t="1583173021460" class="icon" viewBox="0 0 1076 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="3798" width="20" height="20"><path
              d="M33.911964 492.571271h1008.739616v53.270043H33.911964z" fill="#CDD5D7" p-id="3799"></path><path
              d="M1058.477163 561.666897H18.086381v-84.779909h1040.390782zM49.737547 530.015731h977.08845V508.679454H49.737547z"
              fill="#484F59" p-id="3800"></path><path
              d="M106.398786 585.122671L91.279702 815.724024h137.343452l-15.119083-230.601353H106.398786z"
              fill="#F7F8FC" p-id="3801"></path><path
              d="M245.437836 831.549607H74.46502l17.097282-262.252519h136.778253z m-137.202152-31.651166H211.949772l-12.999586-199.091486h-77.714916z"
              fill="#484F59" p-id="3802"></path><path d="M92.6927 545.841314h134.517456v53.270042H92.6927z"
                                                      fill="#CDD5D7" p-id="3803"></path><path
              d="M243.035739 614.79564H76.867117v-84.779909H243.035739z m-134.517456-31.509867H211.949772v-21.618876H108.518283z"
              fill="#484F59" p-id="3804"></path><path d="M73.052022 814.876225h173.798813v67.258727H73.052022z"
                                                      fill="#CDD5D7" p-id="3805"></path><path
              d="M262.676418 897.819236H57.226439v-98.909894h205.449979z m-173.798813-31.509867h142.147647v-35.607561H88.877605z"
              fill="#484F59" p-id="3806"></path><path
              d="M358.619015 585.122671l-15.119084 230.601353h137.202153l-14.977784-230.601353h-107.105285z"
              fill="#F7F8FC" p-id="3807"></path><path
              d="M497.658065 831.549607h-170.972816l17.097282-262.252519H480.419484z m-137.202152-31.651166h103.431489l-12.999586-199.091486h-77.432317z"
              fill="#484F59" p-id="3808"></path><path d="M344.912929 545.841314h134.517456v53.270042h-134.517456z"
                                                      fill="#CDD5D7" p-id="3809"></path><path
              d="M495.255968 614.79564H329.087346v-84.779909h166.168622z m-134.517456-31.509867h102.86629v-21.618876h-102.86629z"
              fill="#484F59" p-id="3810"></path><path d="M325.272251 814.876225h173.657513v67.258727H325.272251z"
                                                      fill="#CDD5D7" p-id="3811"></path><path
              d="M514.755347 897.819236H309.446668v-98.909894h205.308679z m-173.657513-31.509867H483.245481v-35.607561H341.097834z"
              fill="#484F59" p-id="3812"></path><path
              d="M610.839244 585.122671l-15.119084 230.601353h137.202153l-14.977784-230.601353h-107.105285z"
              fill="#F7F8FC" p-id="3813"></path><path
              d="M749.878294 831.549607H579.329378l17.097281-262.252519h136.636954z m-137.343452-31.651166h103.572789l-12.999586-199.091486h-77.432317z"
              fill="#484F59" p-id="3814"></path><path d="M597.133159 545.841314h134.517455v53.270042h-134.517455z"
                                                      fill="#CDD5D7" p-id="3815"></path><path
              d="M747.476197 614.79564H581.307576v-84.779909H747.476197z m-134.658755-31.509867h103.007589v-21.618876h-103.007589z"
              fill="#484F59" p-id="3816"></path><path d="M577.49248 814.876225h173.657513v67.258727H577.49248z"
                                                      fill="#CDD5D7" p-id="3817"></path><path
              d="M766.975576 897.819236H561.666897v-98.909894h205.308679zM593.459362 866.309369h142.006348v-35.607561H593.459362z"
              fill="#484F59" p-id="3818"></path><path
              d="M863.059473 585.122671l-15.119084 230.601353h137.202153l-15.119084-230.601353h-106.963985z"
              fill="#F7F8FC" p-id="3819"></path><path
              d="M1001.957224 831.549607H831.125707L847.799089 569.297088h137.060853z m-137.202153-31.651166h103.572789l-12.999586-199.091486h-77.573617z"
              fill="#484F59" p-id="3820"></path><path d="M849.353388 545.841314h134.517455v53.270042h-134.517455z"
                                                      fill="#CDD5D7" p-id="3821"></path><path
              d="M999.555126 614.79564H833.669104v-84.779909h165.886022z m-134.517455-31.509867h103.007589v-21.618876h-103.007589z"
              fill="#484F59" p-id="3822"></path><path d="M829.712709 814.876225h173.798813v67.258727h-173.798813z"
                                                      fill="#CDD5D7" p-id="3823"></path><path
              d="M1019.195805 897.819236H813.887126v-98.909894h205.308679z m-173.798813-31.509867h142.147647v-35.607561H845.396992z"
              fill="#484F59" p-id="3824"></path><path d="M33.911964 877.895957h1008.739616v130.27846H33.911964z"
                                                      fill="#F7F8FC" p-id="3825"></path><path
              d="M1058.477163 1024H18.086381V861.929074h1040.390782zM49.737547 992.348834h977.08845v-98.909894H49.737547z"
              fill="#484F59" p-id="3826"></path><path d="M798.909342 919.862012z" fill="#CDD5D7" p-id="3827"></path><path
              d="M277.654202 904.036429h521.25514v31.651166H277.654202z" fill="#484F59" p-id="3828"></path><path
              d="M798.909342 960.838968z" fill="#CDD5D7" p-id="3829"></path><path
              d="M277.654202 945.437284h521.25514v31.651166H277.654202z" fill="#484F59" p-id="3830"></path><path
              d="M538.211122 145.821443l264.795915 173.374914 264.795916 173.516214H8.619291l264.795915-173.516214 264.795916-173.374914z"
              fill="#F7F8FC" p-id="3831"></path><path
              d="M1067.802953 508.679454H8.619291L0 480.419484 529.591831 132.539258h17.379881l529.591832 346.891127zM61.606734 476.886988h953.208776L538.211122 164.755623z"
              fill="#484F59" p-id="3832"></path><path
              d="M202.482682 434.779633l335.72844-219.862564 335.728439 219.862564H202.482682z" fill="#CDD5D7"
              p-id="3833"></path><path
              d="M538.211122 233.851249l282.599696 185.102801h-565.199393l282.599697-185.102801z m0-37.86836l-388.715883 254.339727h777.149166l-388.715883-254.339727z"
              fill="#484F59" p-id="3834"></path><path d="M538.211122 156.277632z" fill="#CDD5D7" p-id="3835"></path><path
              d="M522.385539 0h31.651166v156.277632h-31.651166z" fill="#484F59" p-id="3836"></path><path
              d="M643.479509 129.99586V37.02056h110.779081l-20.771078 46.48765 20.771078 46.48765h-110.779081z"
              fill="#FF7A7A" p-id="3837"></path><path
              d="M778.562164 145.821443H627.653926V21.194977H778.562164l-28.25997 62.313233z m-119.257072-31.651166h70.649924l-14.129985-30.662067 14.129985-30.662067h-70.649924z"
              fill="#484F59" p-id="3838"></path><path
              d="M538.635021 119.539672V26.423072h118.126673v93.1166h-118.126673z" fill="#FF8F8F" p-id="3839"></path><path
              d="M672.587277 135.223955H522.809438V10.597489h149.777839z m-118.126673-31.509866h86.475507V42.389954h-86.475507z"
              fill="#484F59" p-id="3840"></path></svg>
          </span>
            <span>学院</span>
          </div>
          <div class="credit-profile-item-title credit-profile-item-value">
            <span>{{college}}</span>
          </div>
        </div>
        <div class="credit-profile-item credit-profile-item-common">
          <div class="credit-profile-item-title">
          <span class="credit-icon">
            <svg t="1583172921258" class="icon" viewBox="0 0 1297 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="3521" width="20" height="20"><path
              d="M242.447833 709.80024L298.235395 581.909885l322.795957-219.290731 66.839815 112.803152-259.640226 162.976872-35.086517 75.260579a87.716293 87.716293 0 0 1-124.030838 16.490663L245.605619 712.256296a18.771287 18.771287 0 0 1-3.157786-2.456056z"
              fill="#FFC400" p-id="3522"></path><path
              d="M322.269659 768.043858a107.364742 107.364742 0 0 1-65.611787-22.279938l-23.332534-17.543259-3.333219-2.806921-10.17509-9.47336 4.73668-14.210039 58.243618-133.153332 344.900463-234.027069 87.716293 147.187939-271.920508 170.34504-35.086517 73.681686a107.715607 107.715607 0 0 1-86.137399 42.279253z m-55.787562-64.208326l14.034607 10.701388a68.769573 68.769573 0 0 0 95.259894-11.227686l37.191708-78.418365 248.587973-155.959569-46.489635-78.418365-300.866884 204.378962z"
              fill="#484F59" p-id="3523"></path><path
              d="M381.741305 323.146822L205.957855 543.841014l-143.85472 190.69522c41.40209 41.226658 110.697961 31.227 158.941922-3.684084l61.75227-76.313174 131.925304-160.345383 210.519103-32.279596 61.050539 73.681686v178.590371H470.334761c-55.436697 1.578893-98.943978 63.155731-97.365085 118.592428 0 0 1.228028 12.631146 1.228028 14.034607h385.951688l148.942265-65.611787h197.712523V475.071441L708.747644 238.939181z"
              fill="#FFDC69" p-id="3524"></path><path
              d="M764.886072 865.935241H357.356176l-2.806921-31.753298c-1.929758-65.260922 47.366798-138.240877 116.311804-140.346068h196.83536V542.612986l-49.647421-59.647079-192.975844 29.472674L298.235395 666.643824l-63.331163 78.242933-2.105191 1.578893a178.941237 178.941237 0 0 1-101.224602 35.086517 114.732911 114.732911 0 0 1-83.155045-32.805893l-12.280281-11.929416 154.205242-204.90526 180.169265-226.132602 341.216378-87.716293 414.722632 245.60562v336.655131H913.828336z m-371.215351-39.296899h362.970019l148.942265-65.611787H1087.682028V486.299126l-381.916738-226.308035-312.796299 80.523557-171.573068 214.904917-132.100737 175.432585a81.751585 81.751585 0 0 0 42.10382 10.87682 137.714579 137.714579 0 0 0 76.137742-25.437724l59.997944-74.207984 136.837417-166.310091 229.290389-35.086517 72.804523 87.716293v205.431557H470.861059c-42.10382 0.70173-75.786877 50.349152-77.190338 92.803838z"
              fill="#484F59" p-id="3525"></path><path d="M976.984067 359.987665h248.237108v473.141682H976.984067z"
                                                      fill="#E5E8EC" p-id="3526"></path><path
              d="M1225.221175 852.777797H957.335618V340.339215h267.885557v39.296899H996.632517v433.844784h228.588658v39.296899z"
              fill="#484F59" p-id="3527"></path><path d="M1046.279938 359.987665h187.186569v533.315059H1046.279938z"
                                                      fill="#01CBD6" p-id="3528"></path><path
              d="M1046.279938 359.987665h187.186569v262.096282H1046.279938z" fill="#01DEE9" p-id="3529"></path><path
              d="M1153.293815 798.218263a17.543259 17.543259 0 1 1 17.543259-17.543259 17.543259 17.543259 0 0 1-17.543259 17.543259z"
              fill="#E5E8EC" p-id="3530"></path><path
              d="M1153.293815 742.430701a37.718006 37.718006 0 1 0 37.542574 37.718006 37.718006 37.718006 0 0 0-37.542574-37.718006z"
              fill="#484F59" p-id="3531"></path><path
              d="M1233.466507 912.951174H1026.631489V340.339215h206.835018v39.296899h-167.538119V873.654274h167.538119v39.2969z"
              fill="#484F59" p-id="3532"></path><path
              d="M37.016275 990.492376l5.087545 6.666438c54.384101-35.086517 112.101422-43.507281 141.749529-21.75364a445.072469 445.072469 0 0 1 49.822855-52.629776 450.510879 450.510879 0 0 1 56.489292-44.033579 392.442693 392.442693 0 0 1-42.630118-49.471989 419.108446 419.108446 0 0 1-35.086517-55.085831 464.545486 464.545486 0 0 1-58.594484 41.40209 462.79116 462.79116 0 0 1-64.734624 32.279595c12.104848 35.086517-12.806579 87.716293-61.927702 129.469248l4.912112 6.841871z"
              fill="#FFFFFF" p-id="3533"></path><path
              d="M36.66541 1024l-27.542916-36.840843-9.122494-12.280281 13.859174-11.929416C61.401405 922.424533 78.0675 877.162926 70.173034 854.882988l-6.14014-17.543259 17.543258-6.841871a456.124722 456.124722 0 0 0 62.103135-31.051567 456.124722 456.124722 0 0 0 56.138428-39.647764l18.595854-15.6135 11.403118 21.578208a394.372452 394.372452 0 0 0 73.857118 99.470275l17.543259 17.543259-20.35018 13.332876A440.160356 440.160356 0 0 0 245.605619 937.862601a425.424019 425.424019 0 0 0-47.54223 50.349152l-11.753983 14.560904-15.087203-11.052253C151.924619 977.334932 105.259551 980.492719 52.629776 1014.175775zM110.873394 859.619668a146.135343 146.135343 0 0 1-38.770601 99.11941 147.012506 147.012506 0 0 1 106.136714-8.420764 496.123351 496.123351 0 0 1 41.577522-42.279253A451.91434 451.91434 0 0 1 259.464794 877.162926a430.336132 430.336132 0 0 1-28.595512-35.086517c-8.947062-12.280281-17.543259-24.735995-24.735994-37.191708-13.332876 9.999657-27.718348 19.473017-42.630119 28.595511a538.578037 538.578037 0 0 1-52.629775 26.139456z"
              fill="#484F59" p-id="3534"></path><path
              d="M992.773 344.549597c99.119411-73.681686 32.630461-162.976872-66.48895-89.470618-168.239849 121.399349-545.419907 399.109131-713.659757 520.333048l76.313175 102.978927C456.124722 751.026897 829.094398 469.457598 992.773 344.549597z"
              fill="#FF7A7A" p-id="3535"></path><path
              d="M285.077951 906.109303L184.905945 771.903375l16.139798-11.578551c84.207641-60.875107 223.150248-162.450574 357.531608-260.517389s272.271372-199.993147 356.303581-260.517389a140.346068 140.346068 0 0 1 80.698989-31.227 62.804866 62.804866 0 0 1 62.629433 41.226658c8.947062 27.542916 0 71.22563-53.857804 111.048826-80.523557 60.699674-212.448861 161.222546-345.42676 261.92085S385.951688 829.445263 300.866884 894.706185z m-44.910742-126.311462l52.629776 70.173034c85.435669-65.085489 215.957512-163.854035 342.444406-259.640226 132.9779-99.119411 264.727771-199.817715 345.602193-261.394552 35.086517-25.78859 44.910742-52.629776 39.998629-67.366112a24.034264 24.034264 0 0 0-25.262292-14.385472 103.680658 103.680658 0 0 0-57.541888 23.683399c-84.207641 60.699674-222.623951 161.924276-356.30358 259.815658-125.609731 92.27754-256.307007 187.362001-341.567244 249.114271z"
              fill="#484F59" p-id="3536"></path><path
              d="M347.707384 837.339729l-78.944663-106.487579-61.75227 45.963337 78.944663 106.663012 61.75227-46.13877z"
              fill="#FF7A7A" p-id="3537"></path><path
              d="M281.744732 910.845983l-102.277197-138.065445 93.330135-69.295871 102.277197 138.591742z m-47.366798-129.820114l55.612129 74.909714 30.349838-22.630803-55.61213-74.909714z"
              fill="#484F59" p-id="3538"></path><path
              d="M779.446976 530.68357l470.685626-349.812575a60.875107 60.875107 0 0 0 17.543259-83.856775L1245.571355 65.611787a60.875107 60.875107 0 0 0-85.435669-7.192736l-471.211924 350.86517z"
              fill="#FF7A7A" p-id="3539"></path><path
              d="M775.412027 558.226486l-114.732911-153.678944L1147.50454 42.630118a89.470618 89.470618 0 0 1 52.629776-17.543258 74.032551 74.032551 0 0 1 60.173376 29.121809l23.332534 31.402433a72.62909 72.62909 0 0 1 12.104849 59.296213 88.593456 88.593456 0 0 1-34.033922 52.629776z m-59.822512-145.609046l67.892411 90.698647L1238.554052 165.082063a48.594826 48.594826 0 0 0 18.946719-28.770944 33.858489 33.858489 0 0 0-5.262978-27.718349l-23.332533-31.227a42.454686 42.454686 0 0 0-57.892754-3.157786z"
              fill="#484F59" p-id="3540"></path><path
              d="M723.659414 315.778653l-23.507966-31.577865L1057.507624 19.122152C1085.75227-1.052596 1122.768545-9.648792 1140.311804 15.6135l113.680315 152.100051-31.402433 23.332534-112.978584-152.100051a58.419051 58.419051 0 0 0-28.946377 11.929416zM5.298064 982.59791l154.503478-115.610074 23.543053 31.455063-154.503478 115.627617z"
              fill="#484F59" p-id="3541"></path><path
              d="M687.520302 603.838958v110.347096H471.562789c-55.436697 1.578893-98.943978 63.155731-97.365085 118.592428 0 0 1.228028 12.631146 1.228028 14.034607h385.951688l148.942265-65.611787z"
              fill="#FFDC69" p-id="3542"></path><path
              d="M760.851122 865.935241h-403.494946l-2.806921-31.753298c-1.929758-65.260922 47.366798-138.240877 116.311804-140.346068h196.83536v-89.996917h39.296899v129.995546H471.387357c-42.630118 1.228028-76.313175 50.87545-77.716636 93.330135h362.970019l145.258181-64.032893 15.788932 35.96368-152.801781 66.839815z"
              fill="#484F59" p-id="3543"></path></svg>
          </span>
            <span>专业</span>
          </div>
          <div class="credit-profile-item-title credit-profile-item-value">
            <span>{{profession}}</span>
          </div>
        </div>
        <div class="credit-profile-item credit-profile-item-bottom credit-profile-item-common">
          <div class="credit-profile-item-title">
          <span class="credit-icon">
            <svg t="1583173002054" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="3665" width="20" height="20"><path
              d="M507.739286 1024c-112.019025 0-178.98692-260.295416-178.98692-512.067644S395.720261 0 507.739286 0s179.122209 260.295416 179.122209 511.932356-66.967895 512.067644-179.122209 512.067644z m0-993.695336c-87.667063 0-148.817545 253.801559-148.817545 481.627692s61.150482 481.762981 148.817545 481.76298 148.817545-253.936848 148.817545-481.76298-60.744616-481.627692-148.817545-481.627692z"
              fill="#484F59" p-id="3666"></path><path
              d="M840.955299 813.22024c-104.578148 0-266.518695-56.009512-422.777117-146.111771-116.212974-67.644339-216.461884-145.435328-284.106223-220.249967C63.721846 367.849914 38.964018 300.070287 64.39829 255.966178c11.905404-20.699168 40.586603-45.321707 110.124983-45.321707 104.578148 0 266.518695 56.009512 422.777118 146.24706 116.212974 67.644339 216.461884 145.435328 284.106222 220.249967 70.485401 79.008588 94.702074 146.788215 69.808958 190.892324-12.040692 20.563879-40.857181 45.186418-110.260272 45.186418zM174.523273 240.949135c-30.304664 0-69.53838 5.276258-83.87898 30.169375-17.858105 30.845818 6.899723 89.01995 66.156164 155.581979C221.603733 499.21522 319.823313 575.247457 433.465802 640.862465c151.929185 87.667063 308.052319 142.1884 407.624785 142.1884 30.439952 0 69.53838-5.276258 84.014269-30.169375 17.858105-30.981107-6.899723-89.01995-66.291452-155.581979-64.803277-72.514731-162.346413-148.817545-276.530057-214.161976-152.064474-87.667063-308.187607-142.1884-407.760074-142.1884z"
              fill="#484F59" p-id="3667"></path><path
              d="M174.523273 813.355529c-69.403092 0-98.21958-24.757828-110.124983-45.321707-25.434271-44.104109 0-111.883736 69.808957-190.892324 66.832607-74.814639 167.75796-153.011494 284.106223-220.249967 156.123134-90.237548 318.198969-146.24706 422.641829-146.24706 69.403092 0 98.21958 24.622539 110.124983 45.321707 25.434271 44.104109 0 111.883736-69.808957 190.892324-66.832607 74.814639-167.622671 153.011494-284.106223 220.249967C441.041968 757.616594 279.101421 813.355529 174.523273 813.355529z m666.432026-572.406394c-99.437178 0-255.6956 54.115471-407.624786 142.1884-113.5072 65.615009-211.72678 141.647245-276.530056 214.161976-59.256441 66.562029-84.014269 124.600872-66.156164 155.581979 14.3406 24.893117 54.115471 30.169375 83.87898 30.169375 99.572467 0 255.6956-54.115471 407.624786-142.1884 113.642489-65.615009 211.72678-141.647245 276.530056-214.161976 59.391729-66.562029 84.149557-124.736161 66.291452-155.581979-14.475888-24.893117-53.574316-30.169375-84.014268-30.169375z"
              fill="#484F59" p-id="3668"></path><path
              d="M954.191922 615.428194A60.609328 60.609328 0 1 1 893.447306 554.683578a60.609328 60.609328 0 0 1 60.744616 60.744616z"
              fill="#01DEE9" p-id="3669"></path><path
              d="M893.447306 691.054565a75.761659 75.761659 0 1 1 75.761659-75.626371 75.761659 75.761659 0 0 1-75.761659 75.626371z m0-121.083367a45.456996 45.456996 0 1 0 45.456995 45.456996A45.456996 45.456996 0 0 0 893.447306 569.971198z"
              fill="#484F59" p-id="3670"></path><path
              d="M464.852775 136.235698a60.609328 60.609328 0 1 1-60.474039-60.609327 60.474039 60.474039 0 0 1 60.474039 60.609327z"
              fill="#FFDC69" p-id="3671"></path><path
              d="M404.378736 211.862069a75.761659 75.761659 0 1 1 75.626371-75.626371 75.626371 75.626371 0 0 1-75.626371 75.626371z m0-121.083366a45.456996 45.456996 0 1 0 45.321707 45.456995 45.592284 45.592284 0 0 0-45.321707-45.456995z"
              fill="#484F59" p-id="3672"></path><path
              d="M268.143038 796.985599a60.609328 60.609328 0 1 1-60.474039-60.609327 60.474039 60.474039 0 0 1 60.474039 60.609327z"
              fill="#D5E962" p-id="3673"></path><path
              d="M207.668999 872.61197a75.626371 75.626371 0 1 1 75.626371-75.626371 75.761659 75.761659 0 0 1-75.626371 75.626371z m0-121.75981a45.456996 45.456996 0 1 0 45.321707 45.456996 45.592284 45.592284 0 0 0-45.321707-44.780552z"
              fill="#484F59" p-id="3674"></path><path
              d="M584.989121 511.932356a73.191175 73.191175 0 1 1-73.055886-73.055886 73.191175 73.191175 0 0 1 73.055886 73.055886z"
              fill="#FF8F8F" p-id="3675"></path><path
              d="M511.933235 600.275862a88.343506 88.343506 0 1 1 88.208218-88.343506 88.478795 88.478795 0 0 1-88.208218 88.343506z m0-146.24706a58.038843 58.038843 0 1 0 58.038843 57.903554 58.038843 58.038843 0 0 0-58.038843-57.903554z"
              fill="#484F59" p-id="3676"></path></svg>
          </span>
            <span>方向</span>
          </div>
          <div class="credit-profile-item-title credit-profile-item-value">
            <span>{{direction}}</span>
          </div>
        </div>
      </div>

      <div
        class="credit-card"
        v-if="$store.state.creditCount.publicCompulsory!==0"
        @click="goToCreditList('public-compulsory')"
      >
        <div class="credit-item">
          <div class="credit-profile-item-title">
            <span>公共必修课</span>
          </div>
          <div class="credit-profile-item-title credit-item-value">
            <span
              v-if="pro"
              :style="{color:countColor(
                $store.state.creditCount.publicCompulsory,
                trainingPlan[grade][profession]['公共必修课']
              )}"
            >
              {{$store.state.creditCount.publicCompulsory}}/{{trainingPlan[grade][profession]['公共必修课']}}
            </span>
            <span v-else>{{$store.state.creditCount.publicCompulsory}}</span>
          </div>
          <van-icon class="credit-right-icon" name="arrow"/>
        </div>
      </div>

      <div class="credit-card" v-if="$store.state.creditCount.publicElective!==0"
           @click="goToCreditList('public-elective')">
        <div class="credit-item">
          <div class="credit-profile-item-title">
            <span>公共选修课</span>
          </div>
          <div class="credit-profile-item-title credit-item-value">
            <span
              v-if="pro"
              :style="{color:countColor(
                $store.state.creditCount.publicElective,
                trainingPlan[grade][profession]['公共选修课']
                )}"
            >
              {{$store.state.creditCount.publicElective}}/{{trainingPlan[grade][profession]['公共选修课']}}
            </span>
            <span v-else>{{$store.state.creditCount.publicElective}}</span>
          </div>
          <van-icon class="credit-right-icon" name="arrow"/>
        </div>
      </div>

      <div class="credit-card" v-if="$store.state.creditCount.professionalCore!==0"
           @click="goToCreditList('professional-core')">
        <div class="credit-item">
          <div class="credit-profile-item-title">
            <span>专业核心课</span>
          </div>
          <div class="credit-profile-item-title credit-item-value">
            <span
              v-if="pro"
              :style="{color:countColor(
               $store.state.creditCount.professionalCore,trainingPlan[grade][profession]['专业核心课']
              )}"
            >
              {{$store.state.creditCount.professionalCore}}/{{trainingPlan[grade][profession]['专业核心课']}}
            </span>
            <span v-else>{{$store.state.creditCount.professionalCore}}</span>
          </div>
          <van-icon class="credit-right-icon" name="arrow"/>
        </div>
      </div>

      <div class="credit-card" v-if="$store.state.creditCount.professionalDirection!==0"
           @click="goToCreditList('professional-direction')">
        <div class="credit-item">
          <div class="credit-profile-item-title">
            <span>专业方向课</span>
          </div>
          <div class="credit-profile-item-title credit-item-value">
            <span
              v-if="pro"
              :style="{color:countColor(
                $store.state.creditCount.professionalDirection,trainingPlan[grade][profession]['专业方向课']
              )}"
            >
              {{$store.state.creditCount.professionalDirection}}/{{trainingPlan[grade][profession]['专业方向课']}}
            </span>
            <span v-else>{{$store.state.creditCount.professionalDirection}}</span>
          </div>
          <van-icon class="credit-right-icon" name="arrow"/>
        </div>
      </div>

      <div class="credit-card" v-if="$store.state.creditCount.professionalElective!==0"
           @click="goToCreditList('professional-elective')">
        <div class="credit-item">
          <div class="credit-profile-item-title">
            <span>专业选修课</span>
          </div>
          <div class="credit-profile-item-title credit-item-value">
            <span
              v-if="pro"
              :style="{color:countColor(
                $store.state.creditCount.professionalElective,trainingPlan[grade][profession]['专业选修课']
                )}"
            >
              {{$store.state.creditCount.professionalElective}}/{{trainingPlan[grade][profession]['专业选修课']}}
            </span>
            <span v-else>{{$store.state.creditCount.professionalElective}}</span>
          </div>
          <van-icon class="credit-right-icon" name="arrow"/>
        </div>
      </div>

      <div class="credit-card" v-if="$store.state.creditCount.growingCompulsory!==0"
           @click="goToCreditList('growing-compulsory')">
        <div class="credit-item">
          <div class="credit-profile-item-title">
            <span>成长必修课</span>
          </div>
          <div class="credit-profile-item-title credit-item-value">
            <span
              v-if="pro"
              :style="{color:countColor(
                $store.state.creditCount.growingCompulsory,trainingPlan[grade][profession]['成长必修课'])}"
            >
              {{$store.state.creditCount.growingCompulsory}}/{{trainingPlan[grade][profession]['成长必修课']}}
            </span>
            <span v-else>{{$store.state.creditCount.growingCompulsory}}</span>
          </div>
          <van-icon class="credit-right-icon" name="arrow"/>
        </div>
      </div>

      <div class="credit-card" v-if="$store.state.creditCount.failSubject!==0"
           @click="goToCreditList('fail-subject')">
        <div class="credit-item">
          <div class="credit-profile-item-title">
            <span>挂科课程</span>
          </div>
          <div class="credit-profile-item-title credit-item-value">
            <div :style="{color:'#F44336'}">
              <span>{{$store.state.creditCount.failSubject}}</span>
            </div>
          </div>
          <van-icon class="credit-right-icon" name="arrow"/>
        </div>
      </div>

      <div class="credit-card" v-if="$store.state.creditCount.matchFailed!==0"
           @click="goToCreditList('match-failed')">
        <div class="credit-item">
          <div class="credit-profile-item-title">
            <span>匹配失败课程</span>
          </div>
          <div class="credit-profile-item-title credit-item-value">
            <span>{{$store.state.creditCount.matchFailed}}</span>
          </div>
          <van-icon class="credit-right-icon" name="arrow"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {Icon} from 'vant'
  import trainingPlan from '@/assets/json/trainingPlan'

  import {checkLogin} from "@/network/token"
  import {created} from "@/expand/creditPro"


  export default {
    name: "CreditPro",
    components: {
      [Icon.name]: Icon
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    data() {
      return {
        loadedSuccessfully: false,
        pro: false,
        grade: null,
        college: null,
        profession: null,
        direction: null,
        trainingPlan: trainingPlan
      }
    },
    created,
    methods: {
      countColor(count, countPlan) {
        if (count >= countPlan) return "#4CAF50"
        else return "#FFC107"
      },
      goToCreditList(type) {
        this.$router.push({
          name: 'creditList',
          params: {courseType: type}
        })
      }
    }
  }
</script>

<style scoped>
  .icon {
    position: relative;
    display: inline-block;
    font: normal normal normal 14px/1 vant-icon;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }

  .credit-card {
    background: white;
    border-radius: 14px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
  }

  .credit-profile-item-common {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    line-height: 24px;
    overflow: hidden;
    color: #323233;
  }

  .credit-profile-item-top {
    padding-top: 18px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .credit-profile-item {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .credit-profile-item-bottom {
    padding-bottom: 18px;
  }

  .credit-profile-item-title {
    flex: 1
  }

  .credit-profile-item-value {
    font-size: 14px;
    position: relative;
    overflow: hidden;
    color: #969799;
    text-align: right;
    vertical-align: middle;
    word-wrap: break-word;
  }

  .credit-icon {
    vertical-align: middle;
    height: 24px;
    margin-right: 12px;
  }

  .credit-item {
    padding: 18px 20px;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    line-height: 24px;
    overflow: hidden;
    color: #323233;
  }

  .credit-item-value {
    position: relative;
    overflow: hidden;
    color: #969799;
    text-align: right;
    vertical-align: middle;
    word-wrap: break-word;
  }

  .credit-right-icon {
    margin-left: 5px;
    color: #969799;
    min-width: 1em;
    height: 24px;
    line-height: 24px;
    position: relative;
    display: inline-block;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
</style>