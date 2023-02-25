interface TerminalProps {
  container: Container,
  terminalLines: string[];
}

const Terminal = ({ container, terminalLines }: TerminalProps): JSX.Element => {
  const erros = ["error", "errors"];
  const Line = (props: { line: string }): JSX.Element => {
    let color = "#04aa6d";

export default Terminal
