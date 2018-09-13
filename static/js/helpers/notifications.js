var isNeedToSendNotification = false;
window.onblur = () => isNeedToSendNotification = true;
window.onfocus = () => isNeedToSendNotification = false;

document.addEventListener('DOMContentLoaded', function() {
    getPermission();
});

export function sendNotification(cfg) {
    if(getPermission() && isNeedToSendNotification) {
        var notification = new Notification(cfg.title, {
            icon: cfg.iconUrl,
            body: cfg.text,
        });

        notification.onclick = function() {
            window.focus();
            this.cancel && this.cancel();
        };
    }
};

function getPermission() {
    if(!Notification) {
        return false;
    }
    if(Notification.permission !== "granted") {
        Notification.requestPermission();
        return false;
    }
    return true;
}