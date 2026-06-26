import { db } from "@/lib/firebase";
import { getErrorMessageFromCode } from "@/lib/utils";
import {
  deleteUser,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export async function updateUserName(userId: string, newName: string) {
  try {
    const userRef = doc(db, "users", userId as string);
    await updateDoc(userRef, {
      fullName: newName,
      updatedAt: new Date().toISOString(),
    });

    return { success: true, message: "İsim başarıyla güncellendi!" };
  } catch (error) {
    console.error(error, "Name updated unsuccessfully!");
    return { success: false, message: "İsim güncelleme başarısız oldu" };
  }
}

export async function updateUserPassword(
  currentPassword: string,
  newPassword: string,
) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      return { success: false, message: "Kullanıcı oturumu bulunamadı" };
    }
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);

    return { success: true, message: "Şifre başarıyla güncellendi" };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message:
        getErrorMessageFromCode(error.code) ||
        "Şifre güncelleme başarısız oldu",
    };
  }
}

export async function deleteUserAccount(currentPassword: string) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      return { success: false, message: "Kullanıcı oturumu bulunamadı" };
    }
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    await reauthenticateWithCredential(user, credential);
    await updateDoc(doc(db, "users", user.uid), {
      updatedAt: new Date().toISOString(),
      deletedAt: new Date().toISOString(),
      status: "deleted",
    });
    await deleteUser(user);
    await auth.signOut();

    return { success: true, message: "Hesap başarıyla silindi" };
  } catch (error: any) {
    console.error(error);

    return {
      success: false,
      message:
        getErrorMessageFromCode(error.code) ||
        "Hesap silme işlemi başarısız oldu",
    };
  }
}
