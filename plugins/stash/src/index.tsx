// creds: https://github.com/c10udburst-discord/vendetta-plugins/blob/master/plugins/delete-embeds/src/index.tsx#LL60
// https://github.com/castdrian/vendetta-plugins/blob/main/plugins/favorite-gifs/src/index.tsx#L22
// https://github.com/Gabe616/VendettaPlugins/blob/main/plugins/message-markdown-preview/src/stuff/openPreview.tsx - dialog
// https://github.com/aeongdesu/vdplugins/blob/7e2374f1db305e616b0e04fb248d6b962db8b30a/plugins/UserBG/src/fetchDB.ts#L4 - for fetching

import { logger } from "@vendetta";
import { findByProps } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { after, before } from "@vendetta/patcher";
import { showConfirmationAlert } from "@vendetta/ui/alerts";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";

let patches = []

const STASH_URL = "https://links.asmr-stash.org/"
const ActionSheet = findByProps("openLazy", "hideActionSheet");
const Router = findByProps('transitionToGuild', 'openURL');
const { FormRow, FormIcon, FormText } = Forms

const patch = before("openLazy", ActionSheet, (ctx) => {
  const [component, args, actionMessage] = ctx
  if (args !== "MessageLongPressActionSheet") return
  component.then(instance => {
    const unpatch = after("default", instance, (_, component) => {
      React.useEffect(() => () => { unpatch() }, [])

      const [msgProps, buttons] = component.props?.children?.props?.children?.props?.children
      const message = msgProps?.props?.message ?? actionMessage?.message

      if (!buttons || !message) return

      const messageId = message.id

      buttons.unshift(
        <FormRow
          label="View in stash"
          onPress={() => {
            fetch(STASH_URL + messageId)
              .then(res => res.text())
              .then(links => showLinks(links))

            ActionSheet.hideActionSheet()
          }}
        />)


    })
  })
})

function showLinks(links: string) {
  const children = []
  links.split("\n").forEach((link, i) => {
    if (!link) return
    if (link.startsWith("http")) {
      children.push(
        <FormRow
          label={link}
          onPress={() =>
            Router.openURL(link)
          } />
      )
    } else {
      children.push(
        <FormText>{link}</FormText>
      )
    }
  })

  showConfirmationAlert({
    title: "links",
    // @ts-ignore
    children: (
      children
    )
  })
}

export default {
  onLoad: () => {
    patches.push(patch)
  },
  onUnload: () => {
    for (const unpatch of patches) {
      unpatch
    }
  }
}