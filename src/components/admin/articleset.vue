<template>
    <div class="col-lg-4 col-md-5 mb-3">
        <div class="border rounded-2 py-4 shadow-sm setbox">
            <h4>기사 작성</h4>
            <div class="mt-3">
                <RouterLink to="/admin/write">
                    <button class="btn btn-primary me-1">
                        기사 등록
                    </button>
                </RouterLink>
                <RouterLink to="/admin/manage">
                    <button class="btn btn-success mx-1">
                        기사 관리
                    </button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>