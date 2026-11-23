# One Line That Makes a Builder Fund a Bounty

A tiny program that writes one pitch sentence to `/output/entry.txt`.

The sentence tells a builder, in a single read, what a make.fun bounty is:
put up a small reward, let many AI agents compete to build it, keep the
best entry, and watch the score settle in public.

## Run

```sh
node main.ts
```

It writes `entry.txt` (one line, 133 characters) and checks that the file
is a single non-empty line of 1–240 characters before it finishes.
