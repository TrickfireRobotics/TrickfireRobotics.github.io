<script lang="ts">
import '../scss/footer.scss'
export default {}
</script>

<template>
    <footer class="d-flex flex-column justify-content-center align-items-center mt-5 py-4">
        <!--footer email-->
        <div class="footer__email">
            <font-awesome-icon :icon="['fas', 'envelope']" />
            tfrbtcs@uw.edu
        </div>
        <!--footer icons-->
        <div class="my-2 d-flex flex-row justify-content-evenly footer__contactIcons">
            <!--instagram icon-->
            <a href="https://www.instagram.com/trickfirerobotics/?hl=en" target="blank" class="footer__icon">
                <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <!--facebook icon-->
            <a href="https://m.facebook.com/trickfirerobotics?wtsid=rdr_0wq159Z9aC8qKx5PX" target="blank"
                class="footer__icon">
                <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
            <!--linkedIn icon-->
            <a href="https://www.linkedin.com/company/trickfire-robotics/mycompany/" class="footer__icon" target="blank">
                <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
        </div>

        <!--footer copy right-->
        <p class="my-0">Copyright © 2023 TrickFire Robotics. All rights reserved. | Bothell, WA</p>
    </footer>
</template>