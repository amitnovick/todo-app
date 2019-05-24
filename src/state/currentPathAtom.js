import { Atom } from '@dbeining/react-atom';

const currentPathAtom = Atom.of(window.location.pathname);

export default currentPathAtom;
