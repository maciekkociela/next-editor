import range from "lodash/range"
import path from "path"
import React from "react"
import { ContextMenuProvider } from "react-contexify"
import "react-contexify/dist/ReactContexify.min.css"
import { connect } from "react-redux"
import { loadFile } from "../../../reducers/editor"

type OwnProps = {
  depth: number
  gitStatus: string
  filepath: string
  ignoreGit?: boolean
}

type Props = OwnProps & {
  loadFile: typeof loadFile
}

const selector = (_state: any, ownProps: OwnProps) => {
  return ownProps
}

const actions = {
  loadFile
}

export const File = connect(
  selector,
  actions
)(
  class extends React.Component<Props> {
    render() {
      const { depth, filepath, gitStatus } = this.props
      const basename = path.basename(filepath)
      const prefix = range(depth)
        .map((_: any) => "◽")
        .join("")

      const suffix = this.props.ignoreGit ? "" : ` [${gitStatus}]`
      return (
        <div>
          <ContextMenuProvider id="menu_id" data={{ filepath }}>
            <div
              onClick={() => this.props.loadFile(filepath)}
            >{`${prefix} ${basename}${suffix}`}</div>
          </ContextMenuProvider>
        </div>
      )
    }
  }
)