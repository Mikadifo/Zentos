import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Category } from "../types/category";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  refreshCategories: () => Promise<void>;
  addCategory: (category: Omit<Category, "id">) => Promise<void>;
  udpateCategory: (id: string, category: Omit<Category, "id">) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const CategoriesContext = createContext<CategoryContextType | null>(null);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshCategories = useCallback(async () => {
    const snapshot = await getDocs(collection(db, "categories"));

    const data = snapshot.docs.map((document) => ({
      ...document.data(),
      id: document.id,
    })) as Category[];

    setCategories(data);
  }, []);

  const addCategory = async (category: Omit<Category, "id">) => {
    await addDoc(collection(db, "categories"), category);
    await refreshCategories();
  };

  const udpateCategory = async (id: string, category: Omit<Category, "id">) => {
    await updateDoc(doc(db, "categories", id), category);
    await refreshCategories();
  };

  const deleteCategory = async (id: string) => {
    await deleteDoc(doc(db, "category", id));
    await refreshCategories();
  };

  useEffect(() => {
    refreshCategories()
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [refreshCategories]);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loading,
        refreshCategories,
        addCategory,
        udpateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error("useCategories must be used within CategoryProvider");
  }

  return context;
}
