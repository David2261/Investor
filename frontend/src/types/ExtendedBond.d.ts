import type { Bond } from "./Bond";

interface ExtendedBond extends Bond {
    maturityDate: string; // "YYYY-MM-DD"
    maturityTime: string; // "HH:mm"
    maturity?: string;
}

export default ExtendedBond;
