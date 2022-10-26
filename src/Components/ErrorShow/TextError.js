export function TextError(props) {
    return <label style={{color: "red"}} className="text-danger">{props.children}</label>;
  }