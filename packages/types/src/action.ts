import Package from "./package";
import { ResolveState, ResolveActions } from "./utils";

/**
 * Tricky utility for defining list of arguments.
 *
 * Hopefully, the https://github.com/microsoft/TypeScript/issues/5453 proposal
 * would avoid this kind of type definitions.
 */
type Arguments<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10> = [A1] extends [null]
  ? []
  : [A2] extends [null]
  ? [A1]
  : [A3] extends [null]
  ? [A1, A2]
  : [A4] extends [null]
  ? [A1, A2, A3]
  : [A5] extends [null]
  ? [A1, A2, A3, A4]
  : [A6] extends [null]
  ? [A1, A2, A3, A4, A5]
  : [A7] extends [null]
  ? [A1, A2, A3, A4, A5, A6]
  : [A8] extends [null]
  ? [A1, A2, A3, A4, A5, A6, A7]
  : [A9] extends [null]
  ? [A1, A2, A3, A4, A5, A6, A7, A8]
  : [A10] extends [null]
  ? [A1, A2, A3, A4, A5, A6, A7, A8, A9]
  : [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10];

export type Action<
  Pkg extends Package,
  A1 = null,
  A2 = null,
  A3 = null,
  A4 = null,
  A5 = null,
  A6 = null,
  A7 = null,
  A8 = null,
  A9 = null,
  A10 = null
> = [A1] extends [null]
  ? ({
      state,
      actions,
      libraries
    }: {
      state: ResolveState<Pkg["state"]>;
      actions: ResolveActions<Pkg["actions"]>;
      libraries: Pkg["libraries"];
    }) => void
  : ({
      state,
      actions,
      libraries
    }: {
      state: ResolveState<Pkg["state"]>;
      actions: ResolveActions<Pkg["actions"]>;
      libraries: Pkg["libraries"];
    }) => (...args: Arguments<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10>) => void;

export type AsyncAction<
  Pkg extends Package,
  A1 = null,
  A2 = null,
  A3 = null,
  A4 = null,
  A5 = null,
  A6 = null,
  A7 = null,
  A8 = null,
  A9 = null,
  A10 = null
> = [A1] extends [null]
  ? ({
      state,
      actions,
      libraries
    }: {
      state: ResolveState<Pkg["state"]>;
      actions: ResolveActions<Pkg["actions"]>;
      libraries: Pkg["libraries"];
    }) => Promise<void>
  : ({
      state,
      actions,
      libraries
    }: {
      state: ResolveState<Pkg["state"]>;
      actions: ResolveActions<Pkg["actions"]>;
      libraries: Pkg["libraries"];
    }) => (
      ...args: Arguments<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10>
    ) => Promise<void>;
