import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";

const ActionSheet = findByProps("openlazy", "hideAction")

const unpatch = before("openLazy", ActionSheet, (ctx) => { 
  const [component, args, actionMessage] = ctx
  if (args !== "MessageLongPressActionSheet") return
  showToast("hi", getAssetIDByName("ic_star_filled"))
})