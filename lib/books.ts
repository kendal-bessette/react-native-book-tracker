import { supabase } from "./supabase";
import { Book } from "../types/database";

export async function getBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*, authors (*)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
