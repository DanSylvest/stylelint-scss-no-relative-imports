export default function getOutput(result) {
  return result.root.toString(result.opts.syntax);
}
