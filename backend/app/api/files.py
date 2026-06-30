from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    Form,
    Query,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from app.dependencies import (
    get_db,
    get_current_user,
)

from app.models.user import User

from app.services.file_service import FileService

router = APIRouter()


# ==========================================================
# Upload File
# ==========================================================

@router.post(
    "/upload",
    status_code=status.HTTP_201_CREATED,
)
async def upload_file(
    file: UploadFile = File(...),
    folder: str = Form(default="uploads"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await FileService.upload_file(
        db=db,
        user=current_user,
        file=file,
        folder=folder,
    )


# ==========================================================
# Upload Multiple Files
# ==========================================================

@router.post(
    "/upload/multiple",
    status_code=status.HTTP_201_CREATED,
)
async def upload_multiple_files(
    files: list[UploadFile] = File(...),
    folder: str = Form(default="uploads"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await FileService.upload_multiple_files(
        db=db,
        user=current_user,
        files=files,
        folder=folder,
    )


# ==========================================================
# Get User Files
# ==========================================================

@router.get("/")
async def get_files(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await FileService.get_files(
        db=db,
        user=current_user,
        page=page,
        page_size=page_size,
    )


# ==========================================================
# Get File
# ==========================================================

@router.get("/{file_id}")
async def get_file(
    file_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    file = await FileService.get_file(
        db=db,
        user=current_user,
        file_id=file_id,
    )

    if file is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found.",
        )

    return file


# ==========================================================
# Rename File
# ==========================================================

@router.put("/{file_id}")
async def rename_file(
    file_id: int,
    filename: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await FileService.rename_file(
        db=db,
        user=current_user,
        file_id=file_id,
        filename=filename,
    )


# ==========================================================
# Download File
# ==========================================================

@router.get("/{file_id}/download")
async def download_file(
    file_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await FileService.download_file(
        db=db,
        user=current_user,
        file_id=file_id,
    )


# ==========================================================
# Delete File
# ==========================================================

@router.delete("/{file_id}")
async def delete_file(
    file_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = await FileService.delete_file(
        db=db,
        user=current_user,
        file_id=file_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found.",
        )

    return {
        "success": True,
        "message": "File deleted successfully.",
    }


# ==========================================================
# Storage Usage
# ==========================================================

@router.get("/storage/usage")
async def storage_usage(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await FileService.storage_usage(
        db=db,
        user=current_user,
    )