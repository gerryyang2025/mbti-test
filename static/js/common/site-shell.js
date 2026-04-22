(function () {
    function forEachNode(nodeList, callback) {
        Array.prototype.slice.call(nodeList).forEach(callback);
    }

    function initNavbarToggle() {
        forEachNode(document.querySelectorAll('.navbar-toggle[data-target]'), function (toggleButton) {
            var targetSelector = toggleButton.getAttribute('data-target');
            var collapseTarget = targetSelector ? document.querySelector(targetSelector) : null;

            if (!collapseTarget) {
                return;
            }

            var controlsId = collapseTarget.id || targetSelector.replace(/^#/, '');

            function setExpanded(expanded) {
                toggleButton.classList.toggle('collapsed', !expanded);
                toggleButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                collapseTarget.classList.toggle('in', expanded);
            }

            toggleButton.setAttribute('aria-controls', controlsId);
            setExpanded(collapseTarget.classList.contains('in'));

            toggleButton.addEventListener('click', function () {
                setExpanded(!collapseTarget.classList.contains('in'));
            });

            forEachNode(collapseTarget.querySelectorAll('a'), function (link) {
                link.addEventListener('click', function () {
                    if (window.innerWidth < 768) {
                        setExpanded(false);
                    }
                });
            });

            window.addEventListener('resize', function () {
                if (window.innerWidth >= 768) {
                    setExpanded(false);
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbarToggle);
    } else {
        initNavbarToggle();
    }
})();
