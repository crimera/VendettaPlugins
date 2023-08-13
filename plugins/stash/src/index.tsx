// creds: https://github.com/c10udburst-discord/vendetta-plugins/blob/master/plugins/delete-embeds/src/index.tsx#LL60
// https://github.com/castdrian/vendetta-plugins/blob/main/plugins/favorite-gifs/src/index.tsx#L22
// https://github.com/Gabe616/VendettaPlugins/blob/main/plugins/message-markdown-preview/src/stuff/openPreview.tsx - dialog
// https://github.com/aeongdesu/vdplugins/blob/7e2374f1db305e616b0e04fb248d6b962db8b30a/plugins/UserBG/src/fetchDB.ts#L4 - for fetching
// https://ihateregex.io/expr/url/ - regex

import { findByProps } from '@vendetta/metro';
import { React, ReactNative } from '@vendetta/metro/common';
import { after, before } from '@vendetta/patcher';
import { showConfirmationAlert } from '@vendetta/ui/alerts';
import { Forms, General } from '@vendetta/ui/components';

import { Link, SimpleText } from '../src/types';
import { logger } from '@vendetta';

let patches = []

const STASH_URL = "https://links.asmr-stash.org/"
const ActionSheet = findByProps("openLazy", "hideActionSheet");
const { FormRow } = Forms
const { ScrollView, Text } = General

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
  let urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm

  let result: RegExpExecArray 
  let index = 0
  while (result = urlRegex.exec(links)) {
    children.push(
      <SimpleText>{links.slice(index, result.index)}</SimpleText>
    )
    children.push(
      <Link text={result?.[0]}></Link>
    )
    index = urlRegex.lastIndex
  }

  if (index==0) {
    children.push(
        <SimpleText>{links}</SimpleText>
    )
  }

  showConfirmationAlert({
    title: "links",
    // @ts-ignore
    children: (
      <ScrollView
        style={{
          marginVertical: 5,
          maxHeight: ReactNative.Dimensions.get("window").height * 0.7,
        }}>
        <Text
            selectable={true}
        >
          {children}
        </Text>
      </ScrollView>
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
