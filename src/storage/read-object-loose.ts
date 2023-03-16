import { ReadObjectLooseOption } from "../type"

type LooseObjectInfo = {
    object: Buffer;
    format: 'deflated';
    source: string;
} | null;
export const readObjectLoose = async({ fs, gitdir, oid }: ReadObjectLooseOption): Promise<LooseObjectInfo> => {
    const source = `objects/${oid.slice(0, 2)}/${oid.slice(2)}`
    const file = await fs.readFile(`${gitdir}/${source}`)
    if (!file) {
      return null
    }
    return { object: file, format: 'deflated', source }
  }
  