# Εκτέλεση του FOUND. σε Visual Studio Code

## Τι χρειάζεσαι

1. Visual Studio Code από https://code.visualstudio.com/
2. Node.js έκδοση 22.13 ή νεότερη από https://nodejs.org/

Μετά την εγκατάσταση του Node.js, κλείσε και άνοιξε ξανά το Visual Studio Code.

Θα χρειαστείς επίσης ένα δωρεάν project στο Supabase (https://supabase.com/) για
τη βάση δεδομένων. Μετά τη δημιουργία του, αντίγραψε το connection string από
**Project Settings > Database > Connection string** (χρησιμοποίησε το pooled
"Transaction" connection στη θύρα 6543).

## Εγκατάσταση του project

1. Κάνε extract το ZIP.
2. Στο Visual Studio Code επίλεξε **File > Open Folder**.
3. Άνοιξε τον φάκελο `found-digital-growth-source`.
4. Επίλεξε **Terminal > New Terminal**.
5. Εκτέλεσε:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup-windows.ps1
```

Το script θα εγκαταστήσει τα packages, θα δημιουργήσει το `.env.local` και, αν
έχεις ήδη βάλει το `DATABASE_URL` στο `.env.local`, θα ετοιμάσει τη βάση
δεδομένων στο Supabase από τον φάκελο `drizzle`. Αν δεν το έχεις βάλει ακόμα,
πρόσθεσέ το στο `.env.local` και μετά τρέξε `npm run db:migrate` και
`npm run db:seed` χειροκίνητα.

## Εκκίνηση

```powershell
npm run dev
```

Άνοιξε τη διεύθυνση που θα εμφανιστεί στο terminal, συνήθως:

```text
http://localhost:3000
```

Για το admin dashboard άνοιξε:

```text
http://localhost:3000/admin
```

Για να σταματήσεις το site, πάτησε `Ctrl+C` στο terminal.

## Πού αλλάζεις το περιεχόμενο

- Αρχική σελίδα: `app/page.tsx`
- Σχεδιασμός και CSS: `app/globals.css`
- Υπηρεσίες: `app/services`
- Portfolio: `app/work`
- Τιμές: `app/pricing`
- Επικοινωνία: `app/contact`
- Backend APIs: `app/api`
- Admin dashboard: `app/admin`
- Βάση δεδομένων: `db` και `drizzle`
- Εικόνες: `public`

Περισσότερες τεχνικές πληροφορίες υπάρχουν στα `SETUP-WINDOWS.md` και
`README.md`.
