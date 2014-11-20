<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>
    <div id="layout">
        <!-- Menu toggle -->
        <a href="#menu" id="menuLink" class="menu-link">
            <!-- Hamburger icon -->
            <span></span>
        </a>

        <div id="menu">
            <div class="pure-menu pure-menu-open">
                <a class="pure-menu-heading" href="index.php">Hawknest</a>

                <ul>
                    <li <?=($page == "Maps") ? 'class="menu-item-divided pure-menu-selected"' : null  ?>>
                        <a href="maps.php">View UHCL Maps</a>
                    </li>
                    <li <?=($page == "Download App") ? 'class="menu-item-divided pure-menu-selected"' : null  ?>>
                        <a href="app.php">Download App</a>
                    </li>

                    <li <?=($page == "Tutorial") ? 'class="menu-item-divided pure-menu-selected"' : null  ?>>
                        <a href="tutorial.php">View Tutorial</a>
                    </li>

                    <li <?=($page == "FAQs") ? 'class="menu-item-divided pure-menu-selected"' : null  ?>>
                        <a href="faq.php">Help / FAQs</a>
                    </li>
                </ul>
            </div>
        </div>
        <div id="main">
            <div class="header">
                <img src="img/logo.png" alt="{logo}" class="pure-u-1 pure-img-responsive" >
                <br><br><br>
            </div>
            <div class="content">