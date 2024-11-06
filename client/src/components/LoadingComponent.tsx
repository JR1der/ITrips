import {Box, CircularProgress} from "@mui/material";
import {BaseLayout} from "../layout/BaseLayout.tsx";

export const LoadingComponent = () => {
    return (
        <BaseLayout>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh',
                }}
            >
                <CircularProgress/>
            </Box>
        </BaseLayout>
    )
}