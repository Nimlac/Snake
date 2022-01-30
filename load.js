var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

// preload images to avoid lag while playing
preload(
    "sprites/apple.png",
    "sprites/head_w.png",
    "sprites/head_a.png",
    "sprites/head_s.png",
    "sprites/head_d.png",
    "sprites/tail_w.png",
    "sprites/tail_a.png",
    "sprites/tail_s.png",
    "sprites/tail_d.png",
    "sprites/body_ww.png",
    "sprites/body_aa.png",
    "sprites/body_ss.png",
    "sprites/body_wa.png",
    "sprites/body_wd.png",
    "sprites/body_aw.png",
    "sprites/body_as.png",
    "sprites/body_sa.png",
    "sprites/body_sd.png",
    "sprites/body_dw.png",
    "sprites/body_ds.png"
)